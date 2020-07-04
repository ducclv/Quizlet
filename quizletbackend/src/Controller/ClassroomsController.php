<?php
namespace App\Controller;

use App\Controller\AppController;

/**
 * Classrooms Controller
 * @property \App\Model\Table\ClassroomsTable $Classrooms
 * @property \App\Model\Table\ClassUsersTable $ClassUsers
 * @property \App\Model\Table\LessonsTable $Lessons
 *
 * @method \App\Model\Entity\Classroom[]|\Cake\Datasource\ResultSetInterface paginate($object = null, array $settings = [])
 */
class ClassroomsController extends AppController
{
    /**
     * Index method
     *
     * @return \Cake\Http\Response|null
     */
    public function index()
    {
        $classrooms = $this->paginate($this->Classrooms);

        $this->set(compact('classrooms'));
    }

    /**
     * View method
     *
     * @param string|null $id Classroom id.
     * @return \Cake\Http\Response|null
     * @throws \Cake\Datasource\Exception\RecordNotFoundException When record not found.
     */
    public function view($id = null)
    {
        $this->RequestHandler->renderAs($this, 'json');
        $this->loadModel('ClassUsers');
        $userId = $this->request->getQuery('user_id');
        $classUser = $this->ClassUsers->find()->where(['classroom_id' => $id, 'user_id' => $userId])->first();
        $res = ['status' => false, 'message' => '', 'data' => null];
        $classroom = $this->Classrooms->get($id, ['contain' => ['Users', 'Lessons', 'Lessons.Words']]);
        if ($classroom) {
            $classroom->numb_lesson = count($classroom->lessons);
            $classroom->numb_student = count($classroom->users);
            foreach($classroom->lessons as $k => $lesson){
                $classroom->lessons[$k]->numb_question = count($lesson->words);
            }
            $res['data'] = $classroom;
            if ($classUser) {
                $res['data']['is_attended'] = true;
            } else {
                $res['data']['is_attended'] = false;
            }
        } else {
            $res['message'] = "Không tìm thấy lớp học";
        }
        $this->set([
            'status' => $res['status'],
            'message' => $res['message'],
            'data' => $res['data'],
            '_serialize' => ['status', 'message', 'data']
        ]);
    }

    /**
     * Add method
     *
     * @return \Cake\Http\Response|null Redirects on successful add, renders view otherwise.
     */
    public function add()
    {
        $this->RequestHandler->renderAs($this, 'json');
        $data = $this->request->getData();
        $data['is_allow_add'] = 1;
        $res = ['status' => false, 'message' => ''];
        $this->loadModel('Users');
        $classroom = $this->Classrooms->newEntity();
        if ($this->request->is('post')) {
            $user = $this->Users->get($data['user_id']);
            $data['creator'] = $user->screen_name;
            $classroom = $this->Classrooms->patchEntity($classroom, $data);
            if ($this->Classrooms->save($classroom)) {
                $res['status'] = true;
            } else {
                $res['message'] = "Đã có lỗi xảy ra, vui lòng thử lại";
            }
        }
        $this->set([
            'status' => $res['status'],
            'message' => $res['message'],
            '_serialize' => ['status', 'message']
        ]);
    }

    /**
     * Edit method
     *
     * @param string|null $id Classroom id.
     * @return \Cake\Http\Response|null Redirects on successful edit, renders view otherwise.
     * @throws \Cake\Datasource\Exception\RecordNotFoundException When record not found.
     */
    public function edit($id = null)
    {
        $this->RequestHandler->renderAs($this, 'json');
        $data = $this->request->getData();
        $data['is_allow_add'] = 1;
        $res = ['status' => false, 'message' => ''];
        $this->loadModel('Users');
        $classroom = $this->Classrooms->get($id);
        if ($this->request->is('post')) {
            $user = $this->Users->get($data['user_id']);
            $data['creator'] = $user->screen_name;
            $classroom = $this->Lessons->patchEntity($classroom, $data);
            if ($this->Lessons->save($classroom)) {
                $res['status'] = true;
            } else {
                $res['message'] = "Đã có lỗi xảy ra, vui lòng thử lại";
            }
        }
        $this->set([
            'status' => $res['status'],
            'message' => $res['message'],
            '_serialize' => ['status', 'message']
        ]);
    }

    /**
     * Delete method
     *
     * @param string|null $id Classroom id.
     * @return \Cake\Http\Response|null Redirects to index.
     * @throws \Cake\Datasource\Exception\RecordNotFoundException When record not found.
     */
    public function delete($id = null)
    {
        $this->RequestHandler->renderAs($this, 'json');
        $this->request->allowMethod(['post', 'delete']);
        $this->loadModel('Lessons');
        $res = ['status' => true, 'message' => ''];
        $classroom = $this->Classrooms->get($id);
        $listLessons = $this->Lessons->find()->where(['classroom_id' => $id]);
        if ($this->Classrooms->delete($classroom)) {
            if($listLessons){
                foreach($listLessons as $lesson){u
                    $lesson = $this->Lessons->patchEntity($lesson, ['classroom_id' => 0]);
                    $this->Lessons->save($lesson);
                }
            }
            $res['status'] = true;
        } else {
            $res['message'] = "Có lỗi xảy ra, xin hãy thử lại";
        }
        $this->set([
            'status' => $res['status'],
            'message' => $res['message'],
            '_serialize' => ['status', 'message']
        ]);

    }

    public function listClass()
    {
        $this->RequestHandler->renderAs($this, 'json');
        $res = ['status' => true, 'message' => '', 'data' => null];
        $keyword = '';
        $keyword = $this->request->getQuery('keyword');
        if ($keyword) {
            $listClasses = $this->Classrooms->find()->contain(['Lessons', 'ClassUsers'])->where([
                'Classrooms.name LIKE' => '%' . $keyword . '%'
            ])->toArray();
            foreach ($listClasses as $k => $class) {
                $listClasses[$k]['numb_lesson'] = count($class['lessons']);
                $listClasses[$k]['numb_attendance'] = count($class['class_users']);
                unset($listClasses[$k]['lessons']);
                unset($listClasses[$k]['class_users']);
            }
        } else {
            $listClasses = [];
        }
        $res['data'] = $listClasses;
        $this->set([
            'status' => $res['status'],
            'message' => $res['message'],
            'data' => $res['data'],
            '_serialize' => ['status', 'message', 'data']
        ]);
    }

    public function viewMyClass($userId)
    {
        $this->loadModel('Users');
        $this->RequestHandler->renderAs($this, 'json');
        $res = ['status' => false, 'message' => ''];
        $user = $this->Users->get($userId);
        if ($user) {
            $listClasses = $this->Classrooms->find()->contain(['Users', 'Lessons'])->where(['user_id' => $userId])->toArray();
            foreach ($listClasses as $k => $class) {
                $listClasses[$k]['numb_lessoon'] = count($class['lessons']);
                $listClasses[$k]['numb_attendance'] = count($class['users']);
                unset($listClasses[$k]['lessons']);
                unset($listClasses[$k]['users']);
            }
            $res['status'] = true;
            $res['data']['list_lesson'] = $listClasses;
            $res['data']['user'] = $user;
        } else {
            $res['message'] = "Không tìm thấy người dùng";
        }

        $this->set([
            'status' => $res['status'],
            'message' => $res['message'],
            'data' => $res['data'],
            '_serialize' => ['status', 'message', 'data']
        ]);
    }

    public function attendClassroom()
    {
        $this->RequestHandler->renderAs($this, 'json');
        $data = $this->request->getData();
        $this->loadModel('ClassUsers');
        $res = ['status' => false, 'message' => ''];
        $classUser = $this->ClassUsers->find()->where(['classroom_id' => $data['classroom_id'], 'user_id' => $data['user_id']])->first();
        if($classUser){
            $res['message'] = "Bạn đã tham gia lớp học";
        } else {
            $classUser = $this->ClassUsers->newEntity();
            $classUser = $this->ClassUsers->patchEntity($classUser, ['classroom_id' => $data['classroom_id'], 'user_id' => $data['user_id']]);
            if ($this->ClassUsers->save($classUser)) {
                $res['status'] = true;
            } else {
                $res['message'] = "Đã có lỗi xảy ra, xin hãy thử lại";
            }
        }

        $this->set([
            'status' => $res['status'],
            'message' => $res['message'],
            '_serialize' => ['status', 'message']
        ]);
    }

    public function quitClassroom()
    {
        $this->RequestHandler->renderAs($this, 'json');
        $data = $this->request->getData();
        $this->request->allowMethod(['post', 'delete']);
        $this->loadModel('ClassUsers');
        $this->loadModel('Lessons');
        $res = ['status' => false, 'message' => ''];
        $classUser = $this->ClassUsers->find()->where(['classroom_id' => $data['classroom_id'], 'user_id' => $data['user_id']])->first();
        if ($this->ClassUsers->delete($classUser)) {
            $res['status'] = true;
        } else {
            $res['message'] = "Đã có lỗi xảy ra, xin hãy thử lại";
        }
        $this->set([
            'status' => $res['status'],
            'message' => $res['message'],
            '_serialize' => ['status', 'message']
        ]);
    }
}
