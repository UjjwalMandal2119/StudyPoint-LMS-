package com.studypoint.backend.service.impl;

import com.studypoint.backend.constants.AssignmentStatus;
import com.studypoint.backend.constants.AttendanceStatus;
import com.studypoint.backend.constants.EnrollmentStatus;
import com.studypoint.backend.constants.GrievanceStatus;
import com.studypoint.backend.constants.SubmissionStatus;
import com.studypoint.backend.dto.response.AdminDashboardStats;
import com.studypoint.backend.dto.response.ParentDashboardStats;
import com.studypoint.backend.dto.response.StudentDashboardStats;
import com.studypoint.backend.dto.response.TeacherDashboardStats;
import com.studypoint.backend.entity.Batch;
import com.studypoint.backend.entity.Notice;
import com.studypoint.backend.entity.Parent;
import com.studypoint.backend.entity.Student;
import com.studypoint.backend.entity.Teacher;
import com.studypoint.backend.entity.User;
import com.studypoint.backend.exception.ResourceNotFoundException;
import com.studypoint.backend.repository.AdmissionApplicationRepository;
import com.studypoint.backend.repository.AssignmentRepository;
import com.studypoint.backend.repository.AssignmentSubmissionRepository;
import com.studypoint.backend.repository.AttendanceRepository;
import com.studypoint.backend.repository.BatchRepository;
import com.studypoint.backend.repository.CourseRepository;
import com.studypoint.backend.repository.DiscussionRepository;
import com.studypoint.backend.repository.EnrollmentRepository;
import com.studypoint.backend.repository.ExamRepository;
import com.studypoint.backend.repository.GrievanceRepository;
import com.studypoint.backend.repository.NoticeRepository;
import com.studypoint.backend.repository.NotificationRepository;
import com.studypoint.backend.repository.ParentRepository;
import com.studypoint.backend.repository.ResultRepository;
import com.studypoint.backend.repository.StudentRepository;
import com.studypoint.backend.repository.SubjectRepository;
import com.studypoint.backend.repository.TeacherRepository;
import com.studypoint.backend.repository.UserRepository;
import com.studypoint.backend.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.YearMonth;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

@Service
@RequiredArgsConstructor
public class DashboardServiceImpl implements DashboardService {

    private static final DateTimeFormatter MONTH_FMT = DateTimeFormatter.ofPattern("MMM yyyy");

    private final UserRepository userRepository;
    private final StudentRepository studentRepository;
    private final TeacherRepository teacherRepository;
    private final ParentRepository parentRepository;
    private final CourseRepository courseRepository;
    private final SubjectRepository subjectRepository;
    private final BatchRepository batchRepository;
    private final EnrollmentRepository enrollmentRepository;
    private final AdmissionApplicationRepository admissionApplicationRepository;
    private final ExamRepository examRepository;
    private final AssignmentRepository assignmentRepository;
    private final AssignmentSubmissionRepository assignmentSubmissionRepository;
    private final AttendanceRepository attendanceRepository;
    private final ResultRepository resultRepository;
    private final NoticeRepository noticeRepository;
    private final GrievanceRepository grievanceRepository;
    private final DiscussionRepository discussionRepository;
    private final NotificationRepository notificationRepository;

    //__PART2__
    @Override
    @Transactional(readOnly = true)
    public AdminDashboardStats getAdminStats() {
        long openGrievances = grievanceRepository.countByStatus(GrievanceStatus.SUBMITTED)
                + grievanceRepository.countByStatus(GrievanceStatus.IN_REVIEW);

        AdminDashboardStats stats = new AdminDashboardStats();
        stats.setTotalStudents(studentRepository.count());
        stats.setTotalTeachers(teacherRepository.count());
        stats.setTotalParents(parentRepository.count());
        stats.setTotalUsers(userRepository.count());
        stats.setTotalCourses(courseRepository.count());
        stats.setTotalSubjects(subjectRepository.count());
        stats.setTotalBatches(batchRepository.count());
        stats.setPendingAdmissions(admissionApplicationRepository.countByStatus(EnrollmentStatus.PENDING));
        stats.setTotalEnrollments(enrollmentRepository.count());
        stats.setTotalExams(examRepository.count());
        stats.setTotalAssignments(assignmentRepository.count());
        stats.setTotalNotices(noticeRepository.countByPublishedTrue());
        stats.setTotalDiscussions(discussionRepository.count());
        stats.setOpenGrievances(openGrievances);
        stats.setResolvedGrievances(grievanceRepository.countByStatus(GrievanceStatus.RESOLVED));
        stats.setMaleStudents(studentRepository.countByUserGender("Male"));
        stats.setFemaleStudents(studentRepository.countByUserGender("Female"));
        stats.setMonthlyNewUsers(buildMonthlyTrend());
        stats.setRecentNotices(noticeRepository.findTop5ByPublishedTrueOrderByPublishDateDesc()
                .stream().map(this::toNoticeSummary).toList());
        return stats;
    }

    //__PART3__
    @Override
    @Transactional(readOnly = true)
    public StudentDashboardStats getStudentStats(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));
        Student student = studentRepository.findByUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Student", "userId", userId));

        long totalDays = attendanceRepository.countByStudentId(student.getId());
        long presentDays = attendanceRepository.countByStudentIdAndStatus(student.getId(), AttendanceStatus.PRESENT);
        long lateDays = attendanceRepository.countByStudentIdAndStatus(student.getId(), AttendanceStatus.LATE);
        long attendedDays = presentDays + lateDays;
        long attendancePct = totalDays == 0 ? 0 : Math.round((attendedDays * 100.0) / totalDays);

        Long batchId = student.getBatch() != null ? student.getBatch().getId() : null;
        long assignmentCount = batchId == null ? 0
                : assignmentRepository.countByBatchIdAndStatus(batchId, AssignmentStatus.PUBLISHED);
        long submissionCount = assignmentSubmissionRepository.countByStudentId(student.getId());
        long pendingAssignments = Math.max(0, assignmentCount - submissionCount);
        long examCount = batchId == null ? 0 : examRepository.countByBatchId(batchId);
        long upcomingExams = batchId == null ? 0
                : examRepository.countUpcomingByBatchId(batchId, LocalDateTime.now());
        long enrollmentCount = enrollmentRepository.findByStudentId(student.getId()).size();
        Double avgPct = resultRepository.findAveragePercentageByStudentId(student.getId());

        StudentDashboardStats stats = new StudentDashboardStats();
        stats.setStudentName(user.getFirstName() + " " + user.getLastName());
        stats.setRollNumber(student.getRollNumber());
        stats.setBatchName(student.getBatch() != null ? student.getBatch().getName() : "Not assigned");
        stats.setTotalDays(totalDays);
        stats.setPresentDays(attendedDays);
        stats.setAttendancePercentage(attendancePct);
        stats.setAssignmentCount(assignmentCount);
        stats.setPendingAssignmentCount(pendingAssignments);
        stats.setExamCount(examCount);
        stats.setUpcomingExamsCount(upcomingExams);
        stats.setResultCount(resultRepository.countByStudentId(student.getId()));
        stats.setAveragePercentage(avgPct == null ? 0.0 : Math.round(avgPct * 10.0) / 10.0);
        stats.setEnrollmentCount(enrollmentCount);
        stats.setUnreadNotifications(notificationRepository.countByUserIdAndReadFalse(userId));
        return stats;
    }

    //__PART4__
    @Override
    @Transactional(readOnly = true)
    public TeacherDashboardStats getTeacherStats(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));
        Teacher teacher = teacherRepository.findByUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Teacher", "userId", userId));

        List<Batch> batches = batchRepository.findByTeacherIdAndActiveTrue(teacher.getId());
        long studentCount = batches.stream()
                .mapToLong(b -> studentRepository.countByBatchId(b.getId()))
                .sum();
        long examCount = batches.stream()
                .mapToLong(b -> examRepository.countByBatchId(b.getId()))
                .sum();

        TeacherDashboardStats stats = new TeacherDashboardStats();
        stats.setTeacherName(user.getFirstName() + " " + user.getLastName());
        stats.setEmployeeId(teacher.getEmployeeId());
        stats.setSpecialization(teacher.getSpecialization());
        stats.setSubjectCount(subjectRepository.countByTeacherId(teacher.getId()));
        stats.setBatchCount(batches.size());
        stats.setStudentCount(studentCount);
        stats.setAssignmentCount(assignmentRepository.countByTeacherId(teacher.getId()));
        stats.setPendingSubmissions(assignmentSubmissionRepository.countByTeacherIdAndStatus(teacher.getId(), SubmissionStatus.SUBMITTED));
        stats.setExamCount(examCount);
        stats.setUnreadNotifications(notificationRepository.countByUserIdAndReadFalse(userId));
        return stats;
    }

    //__PART5__
    @Override
    @Transactional(readOnly = true)
    public ParentDashboardStats getParentStats(Long userId) {
        userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));
        Parent parent = parentRepository.findByUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Parent", "userId", userId));

        List<ParentDashboardStats.ChildSummary> children = new ArrayList<>();
        for (Student child : parent.getStudents()) {
            long totalDays = attendanceRepository.countByStudentId(child.getId());
            long attendedDays = attendanceRepository.countByStudentIdAndStatus(child.getId(), AttendanceStatus.PRESENT)
                    + attendanceRepository.countByStudentIdAndStatus(child.getId(), AttendanceStatus.LATE);
            long attendancePct = totalDays == 0 ? 0 : Math.round((attendedDays * 100.0) / totalDays);
            Double avgPct = resultRepository.findAveragePercentageByStudentId(child.getId());

            children.add(new ParentDashboardStats.ChildSummary(
                    child.getId(),
                    child.getUser().getFirstName() + " " + child.getUser().getLastName(),
                    child.getRollNumber(),
                    child.getBatch() != null ? child.getBatch().getName() : "Not assigned",
                    attendancePct,
                    avgPct == null ? 0.0 : Math.round(avgPct * 10.0) / 10.0
            ));
        }

        ParentDashboardStats stats = new ParentDashboardStats();
        stats.setChildCount(children.size());
        stats.setUnreadNotifications(notificationRepository.countByUserIdAndReadFalse(userId));
        stats.setChildren(children);
        return stats;
    }

    //__PART6__
    private List<AdminDashboardStats.MonthlyTrend> buildMonthlyTrend() {
        LocalDateTime from = LocalDateTime.now().minusMonths(5).withHour(0).withMinute(0).withSecond(0).withNano(0);
        Map<String, Long> counts = new TreeMap<>();
        List<User> recent = userRepository.findByCreatedAtAfter(from);
        for (User u : recent) {
            String key = YearMonth.from(u.getCreatedAt()).format(DateTimeFormatter.ofPattern("yyyy-MM"));
            counts.merge(key, 1L, Long::sum);
        }
        List<AdminDashboardStats.MonthlyTrend> trends = new ArrayList<>();
        YearMonth cursor = YearMonth.from(from);
        for (int i = 0; i < 6; i++) {
            String key = cursor.format(DateTimeFormatter.ofPattern("yyyy-MM"));
            trends.add(new AdminDashboardStats.MonthlyTrend(
                    cursor.format(MONTH_FMT), counts.getOrDefault(key, 0L)));
            cursor = cursor.plusMonths(1);
        }
        return trends;
    }

    private AdminDashboardStats.NoticeSummary toNoticeSummary(Notice n) {
        return new AdminDashboardStats.NoticeSummary(
                n.getId(),
                n.getTitle(),
                n.getPublishDate() != null ? n.getPublishDate().toString() : null,
                n.isImportant());
    }
}