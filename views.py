from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse
from .models import Course, Lesson, Question, Choice, Submission


def submit(request, course_id):
    course = get_object_or_404(Course, pk=course_id)
    submission = Submission.objects.create(course=course)

    total_score = 0
    for key, value in request.POST.items():
        if key.startswith('choice_'):
            choice_id = int(value)
            choice = Choice.objects.get(pk=choice_id)
            submission.choices.add(choice)
            if choice.is_correct:
                total_score += choice.question.grade

    submission.score = total_score
    submission.save()

    return render(request, 'onlinecourse/exam_result.html', {
        'course': course,
        'score': total_score
    })


def show_exam_result(request, course_id, submission_id):
    course = get_object_or_404(Course, pk=course_id)
    submission = get_object_or_404(Submission, pk=submission_id)

    return render(request, 'onlinecourse/exam_result.html', {
        'course': course,
        'submission': submission,
        'score': submission.score
    })
