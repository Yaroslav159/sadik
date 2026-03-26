from django.shortcuts import render
from django.core.mail import send_mail
from django.conf import settings
from django.contrib import messages

def index(request):
    return render(request, 'main/index.html')

def svedeniya(request):
    return render(request, 'main/svedeniya.html')

def pedagogam(request):
    return render(request, 'main/pedagogam.html')

def roditelyam(request):
    return render(request, 'main/roditelyam.html')

def obratnaya_svyaz(request):
    if request.method == 'POST':
        name = request.POST.get('name')
        email = request.POST.get('email')
        message = request.POST.get('message')
        # Отправка email (настройте в settings.py)
        try:
            send_mail(
                f'Сообщение от {name} ({email})',
                message,
                settings.DEFAULT_FROM_EMAIL,   # отправитель — ваш Gmail
                [settings.DEFAULT_FROM_EMAIL], # получатель — тоже ваш Gmail
                fail_silently=False,
            )
            messages.success(request, 'Сообщение отправлено. Спасибо!')
        except Exception as e:
            messages.error(request, f'Ошибка отправки: {e}')
    return render(request, 'main/obratnaya-svyaz.html')

def priem(request):
    return render(request, 'main/priem.html')