<?php
namespace App\Model\Entity;

use Cake\ORM\Entity;

/**
 * LessonUser Entity
 *
 * @property int $id
 * @property int $lesson_id
 * @property int $user_id
 *
 * @property \App\Model\Entity\Lesson $lesson
 * @property \App\Model\Entity\User $user
 */
class LessonUser extends Entity
{
    /**
     * Fields that can be mass assigned using newEntity() or patchEntity().
     *
     * Note that when '*' is set to true, this allows all unspecified fields to
     * be mass assigned. For security purposes, it is advised to set '*' to false
     * (or remove it), and explicitly make individual fields accessible as needed.
     *
     * @var array
     */
    protected $_accessible = [
        'lesson_id' => true,
        'user_id' => true,
        'lesson' => true,
        'user' => true,
    ];
}
