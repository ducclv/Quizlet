<?php
namespace App\Test\TestCase\Model\Table;

use App\Model\Table\ClassUsersTable;
use Cake\ORM\TableRegistry;
use Cake\TestSuite\TestCase;

/**
 * App\Model\Table\ClassUsersTable Test Case
 */
class ClassUsersTableTest extends TestCase
{
    /**
     * Test subject
     *
     * @var \App\Model\Table\ClassUsersTable
     */
    public $ClassUsers;

    /**
     * Fixtures
     *
     * @var array
     */
    public $fixtures = [
        'app.ClassUsers',
        'app.Classrooms',
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
        $config = TableRegistry::getTableLocator()->exists('ClassUsers') ? [] : ['className' => ClassUsersTable::class];
        $this->ClassUsers = TableRegistry::getTableLocator()->get('ClassUsers', $config);
    }

    /**
     * tearDown method
     *
     * @return void
     */
    public function tearDown()
    {
        unset($this->ClassUsers);

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
