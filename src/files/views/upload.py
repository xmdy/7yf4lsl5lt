import hashlib

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from common.utils import file_to_dict
from files.forms import FileUploadModelForm


@csrf_exempt
def upload_view(request):
    if request.method == 'POST':
        form = FileUploadModelForm(request.POST, request.FILES)
        if form.is_valid():
            obj = form.save(commit=True)
            obj.file.seek(0)
            obj.hash = hashlib.md5(obj.file.read()).hexdigest()
            obj.save()
            return JsonResponse({'status': 'ok', 'file': file_to_dict(obj)})
        else:
            print form.errors
            return JsonResponse({'status': 'error', 'description': 'data_error'})
    else:
        return JsonResponse({'status': 'error', 'description': 'method_not_allowed'})