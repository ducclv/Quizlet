<?php

namespace App\Controller;

use App\Controller\AppController;
use Cake\Mailer\Email;

/**
 * Users Controller
 *
 * @property \App\Model\Table\UsersTable $Users
 */
class UsersController extends AppController
{
    /**
     * Index method
     *
     * @return \Cake\Http\Response|null
     */
    public function index()
    {
        $users = $this->paginate($this->Users);

        $this->set(compact('users'));
    }

    /**
     * View method
     *
     * @param string|null $id User id.
     * @return \Cake\Http\Response|null
     * @throws \Cake\Datasource\Exception\RecordNotFoundException When record not found.
     */
    public function view($id = null)
    {
        $user = $this->Users->get($id, [
            'contain' => [],
        ]);

        $this->set('user', $user);
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
        if ($this->checkValidMail($data['username'])) {
            $user = $this->Users->newEntity();
            if ($this->request->is('post')) {
                $user = $this->Users->patchEntity($user, $data);
                if ($this->Users->save($user)) {
                    $res['status'] = true;
                    $res['message'] = "Đăng ký thành công";
                } else {
                    $res['message'] = "Tài khoản đã tồn tại";
                }
            }
        } else {
            $res['message'] = "Sai định dạng mail!";
        }

        $this->set([
            'status' => $res['status'],
            'message' => $res['message'],
            '_serialize' => ['status', 'message']
        ]);
    }

    public function login()
    {
        $this->RequestHandler->renderAs($this, 'json');
        $data = $this->request->getData();
        $res = ['status' => false, 'message' => '', 'data' => null];
        $user = $this->Users->find()->where(['username' => $data['username']])->first();
        if (!$user) {
            $res['message'] = "Tài khoản không tồn tại!";
        } else {
            if ($user->password != $data['password']) {
                $res['message'] = "Sai mật khẩu!";
            } else {
                $res['status'] = true;
                $res['data']['user'] = $user;
            }
        }
        $this->set([
            'status' => $res['status'],
            'message' => $res['message'],
            'data' => $res['data'],
            '_serialize' => ['status', 'message', 'data']
        ]);
    }

    public function forgetPassword()
    {
        $this->RequestHandler->renderAs($this, 'json');
        $data = $this->request->getData();
        $res = ['status' => false, 'message' => ''];
        $user = $this->Users->find()->where(['username' => $data['username']])->first();
        if ($user) {
            $newPass = $this->generateRandomString(8);
            $user = $this->Users->patchEntity($user, ['password' => $newPass]);
            $this->Users->save($user);

            $bodyEmail = "Chào bạn!";
            $bodyEmail .= "<br />Bạn đã khôi phục thành công mật khẩu.";
            $bodyEmail .= "<br />Mật khẩu mới của bạn là: <strong>" . $newPass . "</strong>";
            $bodyEmail .= "<br />Vui lòng đăng nhập và tiến hành đổi mật khẩu.";
            $data_sendEmail = [
                'to' => $data['username'],
                'subject' => 'Khôi phục mật khẩu thành công',
                'title' => 'Khôi phục mật khẩu thành công',
                'body' => $bodyEmail
            ];
            if ($this->sendForgetPassMail($data_sendEmail)) {
                $res['status'] = true;
                $res['message'] = "Gửi mail thành công";
            } else {
                $res['message'] = "Gửi mail không thành công, xin gửi lại";
            }
        } else {
            $res['message'] = "Tài khoản không tồn tại!";
        }
        $this->set([
            'status' => $res['status'],
            'message' => $res['message'],
            '_serialize' => ['status', 'message']
        ]);
    }

    public function getUserById($id)
    {
        $this->RequestHandler->renderAs($this, 'json');
        $res = ['status' => false, 'message' => '', 'data' => null];
        $user = $this->Users->get($id);
        if (!$user) {
            $res['message'] = "Tài khoản không tồn tại!";
        } else {
            $res['status'] = true;
            $res['data']['user'] = $user;
        }
        $this->set([
            'status' => $res['status'],
            'message' => $res['message'],
            'data' => $res['data'],
            '_serialize' => ['status', 'message', 'data']
        ]);
    }

    private function generateRandomString($length = 10)
    {
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $charactersLength = strlen($characters);
        $randomString = '';
        for ($i = 0; $i < $length; $i++) {
            $randomString .= $characters[rand(0, $charactersLength - 1)];
        }
        return $randomString;
    }

    /**
     * Edit method
     *
     * @param string|null $id User id.
     * @return \Cake\Http\Response|null Redirects on successful edit, renders view otherwise.
     * @throws \Cake\Datasource\Exception\RecordNotFoundException When record not found.
     */
    public function edit($id = null)
    {
        $user = $this->Users->get($id, [
            'contain' => [],
        ]);
        if ($this->request->is(['patch', 'post', 'put'])) {
            $user = $this->Users->patchEntity($user, $this->request->getData());
            if ($this->Users->save($user)) {
                $this->Flash->success(__('The user has been saved.'));

                return $this->redirect(['action' => 'index']);
            }
            $this->Flash->error(__('The user could not be saved. Please, try again.'));
        }
        $this->set(compact('user'));
    }

    /**
     * Delete method
     *
     * @param string|null $id User id.
     * @return \Cake\Http\Response|null Redirects to index.
     * @throws \Cake\Datasource\Exception\RecordNotFoundException When record not found.
     */
    public function delete($id = null)
    {
        $this->request->allowMethod(['post', 'delete']);
        $user = $this->Users->get($id);
        if ($this->Users->delete($user)) {
            $this->Flash->success(__('The user has been deleted.'));
        } else {
            $this->Flash->error(__('The user could not be deleted. Please, try again.'));
        }

        return $this->redirect(['action' => 'index']);
    }

    public function listUser()
    {
        $this->RequestHandler->renderAs($this, 'json');
        $res = ['status' => true, 'message' => '', 'data' => null];
        $keyword = '';
        $keyword = $this->request->getQuery('keyword');
        if ($keyword) {
            $listLessons = $this->Users->find()->where([
                'Lessons.name LIKE' => '%' . $keyword . '%'
            ])->toArray();
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

    private function sendForgetPassMail($config = array())
    {
        $defaults = array_merge(array('sendAs' => 'html', 'transport' => 'gmail', 'from' => 'Quizlet App'), $config);
        $config['to'] = trim($config['to'], ' ');
        if (filter_var($config['to'], FILTER_VALIDATE_EMAIL)) {
            try {
                $Email = new Email();
                $Email->setFrom('helitechtestmail@gmail.com', 'Quizlet Team')
                    ->template('themetemplate', 'themelayout')
                    ->setTo($defaults['to'])
                    ->setSubject($defaults['subject'])
                    ->setEmailFormat($defaults['sendAs'])
                    ->setTransport($defaults['transport'])
                    ->setViewVars(['title' => $config['title'], 'content' => $config['body'], 'email' => $defaults['to']]);
                if ($Email->send()) {
                    return true;
                } else {
                    return false;
                }
            } catch (\Exception $e) {
                return false;
            }
        } else {
            return false;
        }
    }

    private function checkValidMail($email)
    {
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            return false;
        }
        return true;
    }
}
