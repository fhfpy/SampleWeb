package com.lin.domain;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;

public class Pic {
	public String pic;
	
	public LocalDate date;
	
	public LocalDateTime datetime;
	
	public Long  timestamp;

	public Long getTimestamp() {
		return timestamp;
	}

	public void setTimestamp(Long timestamp) {
		this.timestamp = timestamp;
	}

	public String getPic() {
		return pic;
	}

	public void setPic(String pic) {
		this.pic = pic;
	}

	public LocalDate getDate() {
		return date;
	}

	public void setDate(LocalDate date) {
		this.date = date;
	}

	public LocalDateTime getDatetime() {
		return datetime;
	}

	public void setDatetime(LocalDateTime datetime) {
		this.datetime = datetime;
	}
	
	
}
