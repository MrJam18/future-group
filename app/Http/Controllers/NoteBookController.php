<?php
declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Requests\PaginateRequest;
use App\Http\Requests\SetNoteRequest;
use App\Models\Note;
use App\Models\Providers\NotebookProvider;

class NoteBookController extends Controller
{

    function getList(PaginateRequest $request, NotebookProvider $provider): array
    {

        $paginator = $provider->getList($request->validated());
        $list = array_map(function (Note $note) {
            $data = $this->getNoteAsArray($note);
            unset($data['photo_extension_id']);
            unset($data['company_id']);
            unset($data['photo_extension']);
            return $data;
        }, $paginator->items());
        return [
          'page' => $paginator->currentPage(),
          'total' => $paginator->total(),
          'totalPages' => $paginator->lastPage(),
          'list' => $list
        ];
    }

    function create(SetNoteRequest $request, NotebookProvider $provider): array
    {
        $data = $request->validated();
        $note = new Note();
        $provider->set($note, $data, $request->file('photo'));
        return $note->toArray();
    }

    function update(SetNoteRequest $request, Note $note, NotebookProvider $provider): void
    {
        $data = $request->validated();
        $provider->set($note, $data, $request->file('photo'));
    }

    function delete(Note $note): void
    {
        $note->delete();
    }

    function getOne(Note $note): array
    {
        return $this->getNoteAsArray($note);
    }

    private function getNoteAsArray(Note $note): array
    {
        $array = $note->toArray();
        $array['company'] = $note->company?->name;
        $array['photo_url'] = $note->photoExtension ? "/storage/photo/$note->id.{$note->photoExtension->name}" : null;
        return $array;
    }
}