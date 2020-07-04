<?php

namespace App\Controller;

use App\Controller\AppController;

/**
 * Folders Controller
 *
 * @property \App\Model\Table\FoldersTable $Folders
 * @property \App\Model\Table\UsersTable $Users
 * @property \App\Model\Table\FoldersItemsTable $FoldersItems
 * @property \App\Model\Table\ClassroomsTable $Classrooms
 * @property \App\Model\Table\LessonsTable $Lessons
 *
 * @method \App\Model\Entity\Folder[]|\Cake\Datasource\ResultSetInterface paginate($object = null, array $settings = [])
 */
class FoldersController extends AppController
{
    /**
     * Index method
     *
     * @return \Cake\Http\Response|null
     */
    public function index()
    {
        $this->paginate = [
            'contain' => ['Users'],
        ];
        $folders = $this->paginate($this->Folders);

        $this->set(compact('folders'));
    }

    /**
     * View method
     *
     * @param string|null $id Folder id.
     * @return \Cake\Http\Response|null
     * @throws \Cake\Datasource\Exception\RecordNotFoundException When record not found.
     */
    public function view($id = null)
    {
        $this->RequestHandler->renderAs($this, 'json');
        $data = $this->request->getData();
        $res = ['status' => false, 'message' => '', 'data' => null];
        $this->loadModel('Users');
        $this->loadModel('FoldersItems');
        $this->loadModel('Classrooms');
        $this->loadModel('Lessons');
        $folder = $this->Folders->get($id, ['contain' => ['Users']]);
        if ($folder) {
            $listClassRoomId = $this->FoldersItems->find()->where(['user_id' => $folder->user->id, 'item_type' => 1, 'folder_id' => $id])->extract('item_id')->toArray();
            $listLessonId = $this->FoldersItems->find()->where(['user_id' => $folder->user->id, 'item_type' => 2, 'folder_id' => $id])->extract('item_id')->toArray();
            if (!$listClassRoomId) {
                $listClassRoomId = [0];
            }
            if (!$listLessonId) {
                $listLessonId = [0];
            }
            $listClassroom = $this->Classrooms->find()->contain(['Users', 'Lessons'])->where(['id IN' => $listClassRoomId])->toArray();
            $listLesson = $this->Lessons->find()->contain(['Users', 'Words'])->where(['id IN' => $listLessonId])->toArray();
            foreach ($listClassroom as $k => $classroom) {
                $listClassroom[$k]['numb_lesson'] = count($classroom['lessons']);
                $listClassroom[$k]['numb_attendance'] = count($classroom['users']);
                unset($listClassroom[$k]['lessons']);
                unset($listClassroom[$k]['users']);
            }
            foreach ($listLesson as $k => $lesson) {
                $listLesson[$k]['numb_question'] = count($lesson['words']);
                $listLesson[$k]['numb_attendance'] = count($lesson['users']);
                unset($listLesson[$k]['words']);
                unset($listLesson[$k]['users']);
            }
            $res['data']['folder'] = $folder;
            $res['data']['list_classroom'] = $listClassroom;
            $res['data']['list_lesson'] = $listLesson;
        } else {
            $res['message'] = "Không tìm thấy folder";
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
        $res = ['status' => false, 'message' => ''];
        $this->loadModel('Users');
        $folder = $this->Folders->newEntity();
        if ($this->request->is('post')) {
            $user = $this->Users->get($data['user_id']);
            $data['creator'] = $user->screen_name;
            $folder = $this->Folders->patchEntity($folder, $data);
            if ($this->Folders->save($folder)) {
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
     * @param string|null $id Folder id.
     * @return \Cake\Http\Response|null Redirects on successful edit, renders view otherwise.
     * @throws \Cake\Datasource\Exception\RecordNotFoundException When record not found.
     */
    public function edit($id = null)
    {
        $this->RequestHandler->renderAs($this, 'json');
        $data = $this->request->getData();
        $res = ['status' => false, 'message' => ''];
        $this->loadModel('Users');
        $folder = $this->Folders->get($id);
        if ($this->request->is('post')) {
            $user = $this->Users->get($data['user_id']);
            $data['creator'] = $user->screen_name;
            $folder = $this->Folders->patchEntity($folder, $data);
            if ($this->Folders->save($folder)) {
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
     * @param string|null $id Folder id.
     * @return \Cake\Http\Response|null Redirects to index.
     * @throws \Cake\Datasource\Exception\RecordNotFoundException When record not found.
     */
    public function delete($id = null)
    {
        $this->RequestHandler->renderAs($this, 'json');
        $this->loadModel('FoldersItems');
        $folder = $this->Folders->get($id);
        $res = ['status' => false, 'message' => ''];
        if ($folder) {
            $listFolderItems = $this->FoldersItems->find()->where(['user_id' => $folder->user_id, 'folder_id' => $id]);
            foreach ($listFolderItems as $k => $deleteItem) {
                $this->Folders->delete($deleteItem);
            }
            if ($this->Folders->delete($folder)) {
                $res['status'] = true;
            } else {
                $res['message'] = "Đã có lỗi xảy ra";
            }
        }
        $this->set([
            'status' => $res['status'],
            'message' => $res['message'],
            '_serialize' => ['status', 'message']
        ]);
    }

    public function getMyFolders($id)
    {
        $this->RequestHandler->renderAs($this, 'json');
        $res = ['status' => false, 'message' => '', 'data' => null];
        $this->loadModel('Users');
        $listFolders = $this->Folders->find()->where(['user_id' => $id])->toArray();
        $res['data'] = $listFolders;
        $this->set([
            'status' => $res['status'],
            'message' => $res['message'],
            'data' => $res['data'],
            '_serialize' => ['status', 'message', 'data']
        ]);
    }

    public function addClassroomToFolder()
    {
        $this->RequestHandler->renderAs($this, 'json');
        $data = $this->request->getData();
        $res = ['status' => false, 'message' => ''];
        $this->loadModel('FoldersItems');
        $saveFolder = $this->FoldersItems->newEntity();
        if ($this->request->is('post')) {
            $saveFolder = $this->FoldersItems->patchEntity($saveFolder, $data);
            if ($this->FoldersItems->save($saveFolder)) {
                $data['status'] = true;
            } else {
                $data['message'] = "Đã có lỗi xảy ra";
            }
        }
        $this->set([
            'status' => $res['status'],
            'message' => $res['message'],
            '_serialize' => ['status', 'message']
        ]);
    }

    public function addLessonToFolder()
    {
        $this->RequestHandler->renderAs($this, 'json');
        $data = $this->request->getData();
        $res = ['status' => false, 'message' => ''];
        $this->loadModel('FoldersItems');
        $saveFolder = $this->FoldersItems->newEntity();
        if ($this->request->is('post')) {
            $saveFolder = $this->FoldersItems->patchEntity($saveFolder, $data);
            if ($this->FoldersItems->save($saveFolder)) {
                $data['status'] = true;
            } else {
                $data['message'] = "Đã có lỗi xảy ra";
            }
        }
        $this->set([
            'status' => $res['status'],
            'message' => $res['message'],
            '_serialize' => ['status', 'message']
        ]);
    }
}
