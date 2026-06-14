from django.urls import path
from . import views

app_name = 'main'

urlpatterns = [
    path('', views.index, name='index'),
    path('svedeniya/', views.svedeniya, name='svedeniya'),
    path('structure/', views.structure, name='structure'),
    path('documents/', views.documents, name='documents'),
    path('uchreditelnye-dokumenty-ustav-liczenziya-dokumenty/', views.uchreditelnye_dokumenty_ustav_liczenziya_dokumenty, name='uchreditelnye_dokumenty_ustav_liczenziya_dokumenty'),
    path('federalnye-dokumenty-dokumenty/', views.federalnye_dokumenty_dokumenty, name='federalnye_dokumenty_dokumenty'),
    path('obrazczy-dogovorov-i-zayavlenij-dokumenty/', views.obrazczy_dogovorov_i_zayavlenij_dokumenty, name='obrazczy_dogovorov_i_zayavlenij_dokumenty'),
    path('predpisanie-organov-osushhestvlyayushhih-kontrol-nadzor-dokumenty/', views.predpisanie_organov_osushhestvlyayushhih_kontrol_nadzor_dokumenty, name='predpisanie_organov_osushhestvlyayushhih_kontrol_nadzor_dokumenty'),
    path('rasporyaditelnye-akty/', views.rasporyaditelnye_akty, name='rasporyaditelnye_akty'),
    path('obrazovanie/', views.obrazovanie, name='obrazovanie'),
    path('obrazovatelnye-standarty-i-trebovaniya/', views.standarts, name='standarts'),
    path('rukovodstvo-pedagogicheskij-sostav/', views.rukovodstvo, name='rukovodstvo'),
    path('materialno-tehnicheskoe-obespechenie-i-osnashhennost-obrazovatelnogo-proczessa/', views.material, name='material'),
    path('platnye-obrazovatelnye-uslugi/', views.paid_services, name='paid_services'),
    path('finansovo-hozyajstvennaya-deyatelnost/', views.finance, name='finance'),
    path('vakantnye-mesta-dlya-priema/', views.vacancies, name='vacancies'),
    path('dostupnaya-sreda/', views.accessible_environment, name='accessible_environment'),
    path('mezhdunarodnoe-sotrudnichestvo/', views.international_cooperation, name='international_cooperation'),
    path('organizacziya-pitaniya-v-obrazovatelnoj-organizaczii/', views.nutrition, name='nutrition'),
    path('lokalnye-akty-po-informaczionnoj-bezopasnosti/', views.loyalacts, name='loyalacts'),
    path('normativnoe-regulirovanie/', views.regulatory, name='regulatory'),
    path('pedagogam/', views.teachers, name='teachers'),
    path('roditelyam-2/', views.parents, name='parents'),
    path('detskie-bezopasnye-sajty/', views.safe_sites, name='safe_sites'),
    path('socz-podderzhka/', views.social_support, name='social_support'),
    path('informacziya-dlya-roditelej/', views.parents_info, name='parents_info'),
    path('stranichka-starshego-vospitatelya/', views.senior_teacher, name='senior_teacher'),
    path('stranichka-psihologa/', views.psychologist, name='psychologist'),
    path('struktura-sajta/', views.site_structure, name='site_structure'),
    path('priem-v-obrazovatelnuyu-organizacziyu', views.priem, name='priem'),
    path('obrabotka-personalnyh-dannyh/', views.personal_data, name='personal_data'),
    path('obratnaya-svyaz/', views.feedback, name='feedback'),
]