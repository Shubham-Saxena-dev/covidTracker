package com.covid.tracker;

import org.apache.commons.lang3.RandomStringUtils;

public class TestConstants {

    public static final String VALID_COUNTRY_NAME = "India";
    public static final String INVALID_COUNTRY_NAME = RandomStringUtils.randomAlphabetic(10).toLowerCase();
    public static final String COMMENT = RandomStringUtils.randomAlphanumeric(20);
    public static final String KEY = "code";
    public static final String COUNTRY_NOT_FOUNT = "Country not found";
    public static final String SERVICE_DOWN = "Service is temporarily down";
    public static final String COUNTRY_BY_NAME = "/covidDetailsByName/" + VALID_COUNTRY_NAME;
    public static final String COVID_DETAILS_PATH = "/covidDetails";

}
