<?php

namespace App\Controller;

use App\Controller\AppController;

/**
 * Lessons Controller
 *
 * @property \App\Model\Table\LessonsTable $Lessons
 * @property \App\Model\Table\LessonUsersTable $LessonUsers
 * @property \App\Model\Table\UsersTable $Users
 *
 * @method \App\Model\Entity\Lesson[]|\Cake\Datasource\ResultSetInterface paginate($object = null, array $settings = [])
 */
class LessonsController extends AppController
{
    /**
     * Index method
     *
     * @return \Cake\Http\Response|null
     */
    public function index()
    {
        $this->paginate = [
            'contain' => ['Classrooms'],
        ];
        $lessons = $this->paginate($this->Lessons);

        $this->set(compact('lessons'));
    }

    /**
     * View method
     *
     * @param string|null $id Lesson id.
     * @return \Cake\Http\Response|null
     * @throws \Cake\Datasource\Exception\RecordNotFoundException When record not found.
     */
    public function view($id = null)
    {
        $this->RequestHandler->renderAs($this, 'json');
        $this->loadModel('LessonUsers');
        $userId = $this->request->getQuery('user_id');
        $lessonUser = $this->LessonUsers->find()->where(['lesson_id' => $id, 'user_id' => $userId])->first();
        $res = ['status' => false, 'message' => '', 'data' => null];
        $lesson = $this->Lessons->get($id, ['contain' => ['Words', 'Users', 'LessonUsers']]);
        if ($lesson) {
            $lesson->numb_question = count($lesson->words);
            $res['data'] = $lesson;
            if ($lessonUser) {
                $res['data']['is_attended'] = true;
            } else {
                $res['data']['is_attended'] = false;
            }
        } else {
            $res['message'] = "Không tìm thấy bài học";
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
        $this->loadModel('Users');
        $data = $this->request->getData();
        $res = ['status' => false, 'message' => ''];
        $lesson = $this->Lessons->newEntity();
        if ($this->request->is('post')) {
            $user = $this->Users->get($data['user_id']);
            $data['creator'] = $user->screen_name;
            $lesson = $this->Lessons->patchEntity($lesson, $data, ['associated' => ['Words']]);
            if ($this->Lessons->save($lesson)) {
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
     * @param string|null $id Lesson id.
     * @return \Cake\Http\Response|null Redirects on successful edit, renders view otherwise.
     * @throws \Cake\Datasource\Exception\RecordNotFoundException When record not found.
     */
    public function edit($id = null)
    {
        $this->RequestHandler->renderAs($this, 'json');
        $data = $this->request->getData();
//        dd($data);
        $res = ['status' => false, 'message' => ''];
        $lesson = $this->Lessons->get($id, ['contain' => 'Words']);
        if ($this->request->is('post')) {
            $user = $this->Users->get($data['user_id']);
            $data['creator'] = $user->screen_name;
            $lesson = $this->Lessons->patchEntity($lesson, $data, ['associated' => ['Words']]);
            if ($this->Lessons->save($lesson)) {
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
     * @param string|null $id Lesson id.
     * @return \Cake\Http\Response|null Redirects to index.
     * @throws \Cake\Datasource\Exception\RecordNotFoundException When record not found.
     */
    public function delete($id = null)
    {
        $this->RequestHandler->renderAs($this, 'json');
        $this->request->allowMethod(['post', 'delete']);
        $lesson = $this->Lessons->get($id);
        $res = ['status' => false, 'message' => ''];
        if ($this->Lessons->delete($lesson)) {
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

    public function attendLesson()
    {
        $this->RequestHandler->renderAs($this, 'json');
        $data = $this->request->getData();
        $this->loadModel('LessonUsers');
        $res = ['status' => false, 'message' => ''];
        $lessonUser = $this->LessonUsers->find()->where(['lesson_id' => $data['lesson_id'], 'user_id' => $data['user_id']])->first();
        if($lessonUser){
            $res['message'] = "Bạn đã tham gia lớp học";
        } else {
            $lessonUser = $this->LessonUsers->newEntity();
            $lessonUser = $this->LessonUsers->patchEntity($lessonUser, ['lesson_id' => $data['lesson_id'], 'user_id' => $data['user_id']]);
            if ($this->LessonUsers->save($lessonUser)) {
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

    public function quitLesson()
    {
        $this->RequestHandler->renderAs($this, 'json');
        $data = $this->request->getData();
        $this->request->allowMethod(['post', 'delete']);
        $this->loadModel('LessonUsers');
        $res = ['status' => false, 'message' => ''];
        $lessonUser = $this->LessonUsers->find()->where(['lesson_id' => $data['lesson_id'], 'user_id' => $data['user_id']])->first();
        if ($this->LessonUsers->delete($lessonUser)) {
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

    public function listLesson()
    {
        $this->RequestHandler->renderAs($this, 'json');
        $res = ['status' => true, 'message' => '', 'data' => null];
        $keyword = '';
        $keyword = $this->request->getQuery('keyword');
        if ($keyword) {
            $listLessons = $this->Lessons->find()->contain(['Users', 'Words', 'LessonUsers'])->where([
                'Lessons.name LIKE' => '%' . $keyword . '%'
            ])->toArray();
            foreach ($listLessons as $k => $lesson) {
                $listLessons[$k]['numb_question'] = count($lesson['words']);
                $listLessons[$k]['numb_attendance'] = count($lesson['lesson_users']);
                if(!$lesson['creator']){
                    $listLessons[$k]['creator'] = "Unknown User";
                }
                unset($listLessons[$k]['words']);
                unset($listLessons[$k]['lesson_users']);
                unset($listLessons[$k]['user']);
            }
        } else {
            $listLessons = [];
        }
        $res['data'] = $listLessons;
        $this->set([
            'status' => $res['status'],
            'message' => $res['message'],
            'data' => $res['data'],
            '_serialize' => ['status', 'message', 'data']
        ]);
    }

    public function viewMyLesson($userId)
    {
        $this->loadModel('Users');
        $this->RequestHandler->renderAs($this, 'json');
        $res = ['status' => false, 'message' => ''];
        $user = $this->Users->get($userId, ['contain' => ['Lessons', 'Lessons.Words', 'Lessons.Users', 'Lessons.LessonUsers']]);
        if ($user) {
            $listLessons = $user->lessons;
            foreach ($listLessons as $k => $lesson) {
                $listLessons[$k]['numb_question'] = count($lesson['words']);
                $listLessons[$k]['numb_attendance'] = count($lesson['lesson_users']);
                if(!$lesson['creator']){
                    $listLessons[$k]['creator'] = "Unknown User";
                }
                unset($listLessons[$k]['words']);
                unset($listLessons[$k]['lesson_users']);
                unset($listLessons[$k]['users']);
            }
            $res['status'] = true;
            $res['data']['list_lesson'] = $listLessons;
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
    public function addLessonToClass(){
        $this->RequestHandler->renderAs($this, 'json');
        $data = $this->request->getData();
        $res = ['status' => false, 'message' => ''];
        $lesson = $this->Lessons->get($data['lesson_id']);
        if($lesson->classroom_id == 0){
            $lesson = $this->Lessons->patchEntity($lesson, ['classroom_id' => $data['classroom_id']]);
            $this->Lessons->save($lesson);
            $res['status'] = true;
        } else {
            $res['message'] = "Lớp học này đã được thêm vào bài học";
        }
        $this->set([
            'status' => $res['status'],
            'message' => $res['message'],
            '_serialize' => ['status', 'message']
        ]);
    }
}
