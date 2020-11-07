package com.covid.tracker.repsitory;

import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import com.covid.tracker.model.CovidData;
import org.springframework.stereotype.Repository;

@Repository
public interface CovidDataRepository extends MongoRepository<CovidData, ObjectId> {

	List<CovidData> findAllByCountry(String country);
	
	CovidData findByCountry(String country);
	CovidData findByCode(String code);
	List<CovidData> findAllByCode(String code);
	
}
