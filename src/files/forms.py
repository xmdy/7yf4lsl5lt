from django.forms import ModelForm

from files.models import FileUpload


class FileUploadModelForm(ModelForm):
    class Meta:
        model = FileUpload
        fields = ['file', 'mtime', 'size', 'name']
