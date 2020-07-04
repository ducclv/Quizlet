<?php
namespace App\Test\TestCase\Model\Table;

use App\Model\Table\WordsTable;
use Cake\ORM\TableRegistry;
use Cake\TestSuite\TestCase;

/**
 * App\Model\Table\WordsTable Test Case
 */
class WordsTableTest extends TestCase
{
    /**
     * Test subject
     *
     * @var \App\Model\Table\WordsTable
     */
    public $Words;

    /**
     * Fixtures
     *
     * @var array
     */
    public $fixtures = [
        'app.Words',
        'app.Lessons',
    ];

    /**
     * setUp method
     *
     * @return void
     */
    public function setUp()
    {
        parent::setUp();
        $config = TableRegistry::getTableLocator()->exists('Words') ? [] : ['className' => WordsTable::class];
        $this->Words = TableRegistry::getTableLocator()->get('Words', $config);
    }

    /**
     * tearDown method
     *
     * @return void
     */
    public function tearDown()
    {
        unset($this->Words);

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
