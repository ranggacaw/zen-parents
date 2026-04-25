<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AcademyMaterial extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'content_html',
        'file_label',
        'audience',
        'published_at',
        'status',
    ];

    protected function casts(): array
    {
        return [
            'published_at' => 'datetime',
        ];
    }
}
