from django.shortcuts import render, redirect
from django.core.mail import send_mail
from django.contrib import messages
from django.conf import settings
from datetime import date
from .utils import get_menu_schedule
from .models import MenuPhoto

def index(request):
    schedule = get_menu_schedule()
    photos = {p.day_number: p for p in MenuPhoto.objects.all()}
    
    months_genitive = {
        1: 'Января', 2: 'Февраля', 3: 'Марта', 4: 'Апреля', 5: 'Мая', 6: 'Июня',
        7: 'Июля', 8: 'Августа', 9: 'Сентября', 10: 'Октября', 11: 'Ноября', 12: 'Декабря'
    }
    weekdays_ru = {
        0: 'Понедельник', 1: 'Вторник', 2: 'Среда', 3: 'Четверг',
        4: 'Пятница', 5: 'Суббота', 6: 'Воскресенье'
    }

    menu_days = []
    for dt, day_num in schedule:
        photo_obj = photos.get(day_num)
        image_url = None
        if photo_obj:
            image_url = request.build_absolute_uri(photo_obj.image.url)
        menu_days.append({
            'date': dt,
            'day_number': day_num,
            'image_url': image_url,
            'month_ru': months_genitive[dt.month],
            'weekday_ru': weekdays_ru[dt.weekday()],
        })
    return render(request, 'main/index.html', {'menu_days': menu_days})

def svedeniya(request):
    return render(request, 'main/svedeniya.html')

def structure(request):
    return render(request, 'main/structure.html')

def documents(request):
    return render(request, 'main/documents.html')

def uchreditelnye_dokumenty_ustav_liczenziya_dokumenty(request):
    return render(request, 'main/uchreddoc.html')

def federalnye_dokumenty_dokumenty(request):
    return render(request, 'main/feddoc.html')

def obrazczy_dogovorov_i_zayavlenij_dokumenty(request):
    return render(request, 'main/obdoc.html')

def predpisanie_organov_osushhestvlyayushhih_kontrol_nadzor_dokumenty(request):
    return render(request, 'main/predpisdoc.html')

def rasporyaditelnye_akty(request):
    return render(request, 'main/rasakt.html')

def obrazovanie(request):
    return render(request, 'main/obrazovanie.html')

def standarts(request):
    return render(request, 'main/standarts.html')

def rukovodstvo(request):
    return render(request, 'main/rukovodstvo.html')

def material(request):
    return render(request, 'main/material.html')

def paid_services(request):
    return render(request, 'main/paid_services.html')

def finance(request):
    return render(request, 'main/finance.html')

def vacancies(request):
    return render(request, 'main/vacancies.html')

def accessible_environment(request):
    return render(request, 'main/accessible_environment.html')

def international_cooperation(request):
    return render(request, 'main/international_cooperation.html')

def nutrition(request):
    return render(request, 'main/nutrition.html')

def loyalacts(request):
    return render(request, 'main/loyalacts.html')

def regulatory(request):
    return render(request, 'main/regulatory.html')

def teachers(request):
    return render(request, 'main/teachers.html')

def parents(request):
    return render(request, 'main/parents.html')

def safe_sites(request):
    return render(request, 'main/safe_sites.html')

def social_support(request):
    return render(request, 'main/social_support.html')

def parents_info(request):
    return render(request, 'main/parents_info.html')

def senior_teacher(request):
    return render(request, 'main/senior_teacher.html')

def psychologist(request):
    return render(request, 'main/psychologist.html')

def site_structure(request):
    return render(request, 'main/site_structure.html')

def priem(request):
    return render(request, 'main/priem.html')

def personal_data(request):
    return render(request, 'main/personal_data.html')

def feedback(request):
    if request.method == 'POST':
        name = request.POST.get('name')
        email = request.POST.get('email')
        message = request.POST.get('message')

        if name and email and message:
            email_subject = f'Сообщение от {name} через форму на сайте'
            email_message = f'Имя: {name}\nEmail: {email}\n\nСообщение:\n{message}'

            try:
                send_mail(
                    email_subject,
                    email_message,
                    settings.DEFAULT_FROM_EMAIL,
                    ['mi5973915@gmail.com'],
                    fail_silently=False,
                )
                messages.success(request, 'Ваше сообщение успешно отправлено! Мы свяжемся с вами в ближайшее время.')
            except Exception as e:
                messages.error(request, 'Произошла ошибка при отправке. Пожалуйста, попробуйте позже.')
        else:
            messages.error(request, 'Пожалуйста, заполните все поля.')

        return redirect('main:feedback')

    return render(request, 'main/feedback.html')

def site(request):
    return render(request, 'main/site.html')