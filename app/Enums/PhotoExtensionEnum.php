<?php
declare(strict_types=1);

namespace App\Enums;

enum PhotoExtensionEnum: int
{
    case jpg = 1;
    case pdf = 2;
    case png = 3;
}