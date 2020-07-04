<?php
namespace App\Test\TestCase\Model\Table;

use App\Model\Table\FoldersItemsTable;
use Cake\ORM\TableRegistry;
use Cake\TestSuite\TestCase;

/**
 * App\Model\Table\FoldersItemsTable Test Case
 */
class FoldersItemsTableTest extends TestCase
{
    /**
     * Test subject
     *
     * @var \App\Model\Table\FoldersItemsTable
     */
    public $FoldersItems;

    /**
     * Fixtures
     *
     * @var array
     */
    public $fixtures = [
        'app.FoldersItems',
        'app.Items',
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
        $config = TableRegistry::getTableLocator()->exists('FoldersItems') ? [] : ['className' => FoldersItemsTable::class];
        $this->FoldersItems = TableRegistry::getTableLocator()->get('FoldersItems', $config);
    }

    /**
     * tearDown method
     *
     * @return void
     */
    public function tearDown()
    {
        unset($this->FoldersItems);

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
