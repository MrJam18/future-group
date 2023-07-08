<?php
declare(strict_types=1);

namespace App\Models\Providers;

use App\Enums\PhotoExtensionEnum;
use App\Exceptions\ShowableException;
use App\Models\Company;
use App\Models\Note;
use App\Models\Providers\Base\AbstractProvider;
use Carbon\Carbon;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class NotebookProvider extends AbstractProvider
{
    public function __construct()
    {
        parent::__construct(Note::class, ['column' => 'created_at', 'direction' => 'DESC']);
    }

    function getList(array $data): LengthAwarePaginator
    {
        return $this->getOrdered($data['order'] ?? null)
            ->with(['photoExtension', 'company'])
            ->paginate($data['perPage'], page: $data['page']);
    }

    function set(Note $note, array $data, ?UploadedFile $file = null): void
    {
        $names = explode(' ', $data['fullName']);
        $note->surname = $names[0];
        $note->name = $names[1];
        if(isset($names[2])) $note->patronymic = $names[2];
        if(isset($data['company'])) {
            $company = Company::firstOrCreate(['name' => $data['company']]);
            $note->company()->associate($company);
        }
        else $note->company()->dissociate();
        $note->phone =  $data['phone'];
        $note->email = $data['email'];
        if(isset($data['birth_date'])) {
            $note->birth_date = Carbon::createFromFormat(RUS_DATE_FORMAT, $data['birth_date']);
        }
        if($note->photoExtension) Storage::delete("public/photo/$note->id.{$note->photoExtension->name}");
        if($file) {
            $extension = $file->getClientOriginalExtension();
            $extensionId = null;
            foreach (PhotoExtensionEnum::cases() as $enum) {
                if($extension === $enum->name) {
                    $extensionId = $enum->value;
                    break;
                }
            }
            if(!$extensionId) throw new ShowableException('Файл имеет несоответствующее разрешение');
            $note->photo_extension_id = $extensionId;
        }
        elseif($note->photoExtension) $note->photoExtension()->dissociate();
        $note->save();
        if($file) $file->storeAs("public/photo", "$note->id.$extension");
    }
}