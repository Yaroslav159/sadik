from django.urls import path
from . import views

app_name = 'main'

urlpatterns = [
    path('', views.index, name='index'),
    path('svedeniya/', views.svedeniya, name='svedeniya'),
    path('pedagogam/', views.pedagogam, name='pedagogam'),
    path('roditelyam/', views.roditelyam, name='roditelyam'),
    path('obratnaya-svyaz/', views.obratnaya_svyaz, name='obratnaya-svyaz'),
    path('priem/', views.priem, name='priem'),
]