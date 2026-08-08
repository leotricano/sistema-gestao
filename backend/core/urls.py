from rest_framework.routers import DefaultRouter
from .views import AtivoViewSet, ChamadoViewSet

router = DefaultRouter()
router.register(r'ativos', AtivoViewSet)
router.register(r'chamados', ChamadoViewSet)

urlpatterns = router.urls