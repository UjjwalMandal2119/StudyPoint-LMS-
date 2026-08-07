package com.studypoint.backend.constants;

public final class AppConstants {

    private AppConstants() {}

    public static final String DEFAULT_PAGE_NUMBER = "0";
    public static final String DEFAULT_PAGE_SIZE = "20";
    public static final String DEFAULT_SORT_BY = "createdAt";
    public static final String DEFAULT_SORT_DIRECTION = "desc";

    public static final String ROLE_SUPER_ADMIN = "SUPER_ADMIN";
    public static final String ROLE_ADMIN = "ADMIN";
    public static final String ROLE_TEACHER = "TEACHER";
    public static final String ROLE_STUDENT = "STUDENT";
    public static final String ROLE_PARENT = "PARENT";
    public static final String ROLE_RECEPTIONIST = "RECEPTIONIST";
    public static final String ROLE_ACCOUNTANT = "ACCOUNTANT";
    public static final String ROLE_LIBRARIAN = "LIBRARIAN";

    public static final String AUTHORIZATION_HEADER = "Authorization";
    public static final String BEARER_PREFIX = "Bearer ";

    public static final String DATE_FORMAT = "yyyy-MM-dd";
    public static final String DATE_TIME_FORMAT = "yyyy-MM-dd HH:mm:ss";

    public static final String UPLOAD_DIR_AVATARS = "avatars";
    public static final String UPLOAD_DIR_ASSIGNMENTS = "assignments";
    public static final String UPLOAD_DIR_MATERIALS = "materials";
    public static final String UPLOAD_DIR_LECTURES = "lectures";
    public static final String UPLOAD_DIR_CERTIFICATES = "certificates";
    public static final String UPLOAD_DIR_DOCUMENTS = "documents";

    public static final String CACHE_NAME_USERS = "users";
    public static final String CACHE_NAME_COURSES = "courses";
    public static final String CACHE_NAME_BATCHES = "batches";
}