package com.covid.tracker;

import com.covid.tracker.model.Country;
import com.covid.tracker.model.CovidData;
import com.covid.tracker.model.CovidTotal;
import com.covid.tracker.model.exception.CovidException;
import com.covid.tracker.repsitory.ApiHistoryRepository;
import com.covid.tracker.repsitory.CountryRepository;
import com.covid.tracker.repsitory.CovidDataRepository;
import com.covid.tracker.repsitory.CovidRestRepository;
import com.covid.tracker.service.CovidDetailsService;
import com.covid.tracker.service.CovidDetailsServiceImpl;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.Assert;
import org.junit.jupiter.api.Test;
import org.mockito.Matchers;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

@WebAppConfiguration
@SpringBootTest(classes = CovidTrackerApplication.class)
class CovidTrackerApplicationTests {

    private CovidDetailsService service;
    @Mock
    private CountryRepository countryRepository;
    @Mock
    private CovidRestRepository covidRestRepository;
    @Mock
    private ApiHistoryRepository apiHistoryRepository;
    @Mock
    private CovidDataRepository covidDataRepository;
    @Mock
    private Country country;
    @Mock
    private CovidData covidData;

    private MockMvc mvc;
    @Autowired
    private WebApplicationContext webApplicationContext;

    public void setUp() {
        service = new CovidDetailsServiceImpl(countryRepository, apiHistoryRepository, covidRestRepository, covidDataRepository);
    }

    public void setUpMVC() {
        mvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();
    }

    @Test
    public void test_GetCountryByName() throws Exception {
        this.setUpMVC();
        MvcResult mvcResult = mvc.perform(MockMvcRequestBuilders.get(TestConstants.COUNTRY_BY_NAME)
                .accept(MediaType.APPLICATION_JSON_VALUE)).andReturn();
        Assert.assertEquals(mvcResult.getResponse().getStatus(), HttpStatus.OK.value());
        CovidData[] data = this.resolveJson(mvcResult.getResponse().getContentAsString(), CovidData[].class);
        Assert.assertEquals(data[0].getCode(), "IN");
        Assert.assertEquals(data[0].getCountry(), TestConstants.VALID_COUNTRY_NAME);
    }

    @Test
    public void test_GetCovidTotalDetails() throws Exception {
        this.setUpMVC();
        MvcResult mvcResult = mvc.perform(MockMvcRequestBuilders.get(TestConstants.COVID_DETAILS_PATH)
                .accept(MediaType.APPLICATION_JSON_VALUE)).andReturn();
        Assert.assertEquals(mvcResult.getResponse().getStatus(), HttpStatus.OK.value());
        CovidTotal[] data = this.resolveJson(mvcResult.getResponse().getContentAsString(), CovidTotal[].class);
        Assert.assertNotNull(data[0].getConfirmed());
        Assert.assertNotNull(data[0].getRecovered());
    }

    private <T> T resolveJson(String content, Class<T> covidClass) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        return objectMapper.readValue(content, covidClass);
    }

    @Test
    public void givenCheckCountries_fromDatabase() {
        this.setUp();
        Mockito.when(covidRestRepository.getListOfCountries()).thenReturn(Arrays.asList(new Country()));
        Assert.assertEquals(service.getCountries(Boolean.FALSE).size(), covidRestRepository.getListOfCountries().size());
    }

    @Test
    public void givenCheckCountries_fromDatabase_ExceptionThrown() {
        this.setUp();
        Exception exception = null;
        Mockito.when(covidRestRepository.getListOfCountries()).thenThrow(new CovidException(TestConstants.SERVICE_DOWN, new Exception()));
        try {
            service.getCountries(Boolean.FALSE);
        } catch (CovidException ex) {
            exception = ex;
        }
        Assert.assertNotNull(exception);
    }

    @Test
    public void test_addCommentByName() {
        this.setUp();
        Exception exce = null;
        Map<String, String> map = new HashMap<>();
        map.put(TestConstants.KEY, TestConstants.COMMENT);
        Mockito.when(covidDataRepository.findByCode(map.get(TestConstants.KEY))).thenReturn(covidData);
        try {
            service.addCommentByCode(map);
        } catch (CovidException exception) {
            exce = exception;
        }
        Assert.assertNull(exce);
    }

    @Test
    public void test_addCommentByName_exceptionGiven() {
        this.setUp();
        Exception exce = null;
        Map<String, String> map = new HashMap<>();
        map.put(Matchers.anyString(), TestConstants.COMMENT);
        try {
            service.addCommentByCode(map);
        } catch (CovidException exception) {
            exce = exception;
        }
        Assert.assertNotNull(exce);
    }

    @Test
    public void test_CountryFound_whenUpdateCountry() {
        this.setUp();
        Exception exce = null;
        Mockito.doReturn(TestConstants.VALID_COUNTRY_NAME).when(country).getName();
        try {
            service.updateCountry(country);
        } catch (CovidException exception) {
            exce = exception;
        }
        Assert.assertNull(exce);
    }

    @Test
    public void test_CountryNotFound_whenUpdateCountry() {
        this.setUp();
        Exception exce = null;
        Mockito.doReturn(TestConstants.INVALID_COUNTRY_NAME).when(country).getName();
        Mockito.when(countryRepository.findByName(Matchers.anyString())).thenThrow(new CovidException(TestConstants.COUNTRY_NOT_FOUNT, new Exception()));
        try {
            service.updateCountry(country);
        } catch (CovidException exception) {
            exce = exception;
        }
        Assert.assertNotNull(exce);
    }
}