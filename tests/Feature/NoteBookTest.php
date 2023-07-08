<?php
declare(strict_types=1);

namespace Feature;

use Database\Seeders\DatabaseSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Testing\TestResponse;
use Tests\TestCase;

class NoteBookTest extends TestCase
{
    use RefreshDatabase;

    public function __construct(string $name)
    {
        parent::__construct($name);
    }

    function test_list_response(): void
    {
        $parameters = [
            'page' => 1,
            'perPage' => 10
        ];
        $response = $this->call('get', '/api/v1/notebook/', $parameters);
        $this->assertEquals(200, $response->status(), 'assert status');
        $response->assertJson([
            'page' => 1,
            'total' => 0,
            'totalPages' => 1,
            'list' => []
        ]);
    }
    function test_create_note()
    {
        $response = $this->createNote();
        $response->assertOk();
    }
    function test_create_with_file()
    {
        $this->seed(DatabaseSeeder::class);
        $file = UploadedFile::fake()->create('file.jpg', 1024);
        $response = $this->call('post', $this->getBaseUrl(), $this->getNoteArray(), files: ['photo' => $file]);
        $response->assertOk();
    }

    function test_update()
    {
        $createData = $this->createNote()->json();
        $response = $this->call('post', $this->getBaseUrl() . $createData['id'], $this->getNoteArray());
        $response->assertOk();
    }
    function test_delete()
    {
        $createData = $this->createNote()->json();
        $response = $this->call('delete', $this->getBaseUrl() . $createData['id']);
        $response->assertOk();
    }
    function test_get_one()
    {
        $createData = $this->createNote()->json();
        $response = $this->call('get', $this->getBaseUrl() . $createData['id']);
        $this->assertEquals($createData['id'], $response->json()['id']);
    }
    private function getBaseUrl(): string
    {
        return '/api/v1/notebook/';
    }
    private function getNoteArray(): array
    {
        return [
            'fullName' => 'тестов тест выфвфы',
            'phone' => '+79821174497',
            'email' => 'kianga2@mail.ru'
        ];
    }
    private function createNote(): TestResponse
    {
        return $this->call('post', '/api/v1/notebook/', $this->getNoteArray());
    }


}