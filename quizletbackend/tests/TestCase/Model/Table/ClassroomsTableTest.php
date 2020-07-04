<?php
namespace App\Test\TestCase\Model\Table;

use App\Model\Table\ClassroomsTable;
use Cake\ORM\TableRegistry;
use Cake\TestSuite\TestCase;

/**
 * App\Model\Table\ClassroomsTable Test Case
 */
class ClassroomsTableTest extends TestCase
{
    /**
     * Test subject
     *
     * @var \App\Model\Table\ClassroomsTable
     */
    public $Classrooms;

    /**
     * Fixtures
     *
     * @var array
     */
    public $fixtures = [
        'app.Classrooms',
        'app.Users',
        'app.ClassUsers',
        'app.Lessons',
        'app.ClassroomsUsers',
    ];

    /**
     * setUp method
     *
     * @return void
     */
    public function setUp()
    {
        parent::setUp();
        $config = TableRegistry::getTableLocator()->exists('Classrooms') ? [] : ['className' => ClassroomsTable::class];
        $this->Classrooms = TableRegistry::getTableLocator()->get('Classrooms', $config);
    }

    /**
     * tearDown method
     *
     * @return void
     */
    public function tearDown()
    {
        unset($this->Classrooms);

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
