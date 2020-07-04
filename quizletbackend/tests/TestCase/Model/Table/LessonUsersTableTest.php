<?php
namespace App\Test\TestCase\Model\Table;

use App\Model\Table\LessonUsersTable;
use Cake\ORM\TableRegistry;
use Cake\TestSuite\TestCase;

/**
 * App\Model\Table\LessonUsersTable Test Case
 */
class LessonUsersTableTest extends TestCase
{
    /**
     * Test subject
     *
     * @var \App\Model\Table\LessonUsersTable
     */
    public $LessonUsers;

    /**
     * Fixtures
     *
     * @var array
     */
    public $fixtures = [
        'app.LessonUsers',
        'app.Lessons',
        'app.Users',
    ];

    /**
     * setUp method
     *
     * @return void
     */
    public function setUp()
    {
        parent::setUp();
        $config = TableRegistry::getTableLocator()->exists('LessonUsers') ? [] : ['className' => LessonUsersTable::class];
        $this->LessonUsers = TableRegistry::getTableLocator()->get('LessonUsers', $config);
    }

    /**
     * tearDown method
     *
     * @return void
     */
    public function tearDown()
    {
        unset($this->LessonUsers);

        parent::tearDown();
    }

    /**
     * Test initialize method
     *
     * @return void
     */
    public function testInitialize()
    {
        $this->markTestIncomplete('Not implemented yet.');
    }

    /**
     * Test validationDefault method
     *
     * @return void
     */
    public function testValidationDefault()
    {
        $this->markTestIncomplete('Not implemented yet.');
    }

    /**
     * Test buildRules method
     *
     * @return void
     */
    public function testBuildRules()
    {
        $this->markTestIncomplete('Not implemented yet.');
    }
}
