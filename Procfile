release: python panel/manage.py migrate
web: gunicorn --chdir panel/ticket_project ticket_project.wsgi:application --log-file -
