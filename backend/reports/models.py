"""Reports models for Brightloop."""
from django.db import models

class SavedReport(models.Model):
    title = models.CharField(max_length=200)
    report_type = models.CharField(max_length=50)
    parameters = models.JSONField(default=dict, blank=True)
    generated_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.title} ({self.report_type})"
