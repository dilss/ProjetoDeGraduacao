package com.imrsac.exceptions;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties({"stackTrace", "cause", "suppressed"})
public class IMRSACExeption extends AppException {
    private final IAppError appErrorImpl;

    public IMRSACExeption(IAppError appErrorImpl) {
        super(appErrorImpl);
        this.appErrorImpl = appErrorImpl;       
    }

    public String getCode() {
        return this.appErrorImpl.getCode();
    }

    public int getStatusCode() {
        return this.appErrorImpl.getStatusCode();
    }
}
