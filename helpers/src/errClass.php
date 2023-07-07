<?php
declare(strict_types=1);

function errClass(bool $error): ?string
{
    if($error) return 'is-invalid';
    return null;
}
