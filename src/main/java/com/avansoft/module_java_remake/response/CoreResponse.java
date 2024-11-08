package com.avansoft.module_java_remake.response;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CoreResponse<T> {
    private int code;
    private String message;
    public T data;

}
