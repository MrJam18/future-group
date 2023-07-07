<?php
declare(strict_types=1);

function getIfSet(mixed &$var): mixed
{
    return $var ?? null;
}
