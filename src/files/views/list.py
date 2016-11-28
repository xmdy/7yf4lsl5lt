from django.http import JsonResponse

from common.utils import file_to_dict
from files.models import FileUpload


def files_list_view(request):
    files = FileUpload.objects.all()[:60] # show only last 60 files
    files = [file_to_dict(el) for el in files]
    response = {
        'files': files,
        'status': 'ok'
    }
    return JsonResponse(response)