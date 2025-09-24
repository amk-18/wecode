package in.parida.wecode.dto;

import lombok.Data;

@Data
public class CodeSubmissionDTO {
    private Long problemId;
    private String code;
    private String language;
}