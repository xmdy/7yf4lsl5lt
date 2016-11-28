import hashlib
import os

from django.utils.deconstruct import deconstructible


@deconstructible
class GetUploadTo(object):
    def __init__(self, field_name, directory='images'):
        self.field_name = field_name
        self.directory = directory

    def __call__(self, instance, filename):
        field = getattr(instance, self.field_name)

        if field and field.file:
            _file = field.file
            _hex = hashlib.md5(_file.read()).hexdigest()
            _file.seek(0)
            fname, extension = os.path.splitext(filename)
            return '{4}/{0}{1}{2}{3}'.format(_hex[:2], _hex[2:4], _hex[4:], extension.lower(), self.directory)

        return '{directory}/{filename}'.format(directory=self.directory, filename=filename)


def file_to_dict(f):
    return {'id': f.id, 'name': f.name, 'size': f.size, 'hash': f.hash, 'created': f.created}
