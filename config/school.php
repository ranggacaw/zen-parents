<?php

return [
    'name' => env('SCHOOL_NAME', 'Zen Parents Academy'),
    'short_name' => env('SCHOOL_SHORT_NAME', 'Zen Parents'),
    'tagline' => env('SCHOOL_TAGLINE', 'The mobile-first parent portal for school life.'),
    'domain' => env('SCHOOL_DOMAIN', env('APP_URL', 'http://localhost')),
    'brand' => [
        'primary' => env('SCHOOL_BRAND_PRIMARY', '#3b82f6'),
        'secondary' => env('SCHOOL_BRAND_SECONDARY', '#14b8a6'),
        'accent' => env('SCHOOL_BRAND_ACCENT', '#f59e0b'),
        'logo_mark' => env('SCHOOL_LOGO_MARK', 'ZP'),
    ],
    'features' => [
        'admissions' => env('FEATURE_ADMISSIONS', true),
        'academics' => env('FEATURE_ACADEMICS', true),
        'finance' => env('FEATURE_FINANCE', true),
        'messaging' => env('FEATURE_MESSAGING', true),
        'content' => env('FEATURE_CONTENT', true),
        'pwa' => env('FEATURE_PWA', true),
    ],
];
