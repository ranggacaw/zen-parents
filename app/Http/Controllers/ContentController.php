<?php

namespace App\Http\Controllers;

use App\Models\AcademyMaterial;
use App\Models\Activity;
use App\Models\Article;
use App\Models\PartnerPromotion;
use Inertia\Inertia;
use Inertia\Response;

class ContentController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Content/Index', [
            'materials' => AcademyMaterial::query()->latest('published_at')->get(),
            'articles' => Article::query()->latest('published_at')->get(),
            'activities' => Activity::query()->latest('starts_at')->get(),
            'partners' => PartnerPromotion::query()->latest()->get(),
        ]);
    }

    public function showMaterial(AcademyMaterial $material): Response
    {
        return Inertia::render('Content/MaterialShow', [
            'material' => $material,
        ]);
    }
}
