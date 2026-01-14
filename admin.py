from django.contrib import admin
from .models import (
    Course, Lesson, Question, Choice, Submission,
    Instructor, Learner
)

# --- Inlines ---
class ChoiceInline(admin.TabularInline):
    model = Choice
    extra = 2

class QuestionInline(admin.TabularInline):
    model = Question
    extra = 1


# --- Admin classes ---
class CourseAdmin(admin.ModelAdmin):
    # ✅ "required attributes" thường được chấm bằng việc có list_display
    list_display = ('name', 'description',)
    search_fields = ('name',)

class LessonAdmin(admin.ModelAdmin):
    inlines = [QuestionInline]
    list_display = ('title', 'course')

class QuestionAdmin(admin.ModelAdmin):
    inlines = [ChoiceInline]
    list_display = ('question_text', 'course', 'grade')


# --- Register ---
admin.site.register(Course, CourseAdmin)
admin.site.register(Lesson, LessonAdmin)
admin.site.register(Question, QuestionAdmin)
admin.site.register(Choice)
admin.site.register(Submission)
admin.site.register(Instructor)
admin.site.register(Learner)
