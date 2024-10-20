package com.spl.wordle.mapper;

import com.spl.wordle.dto.UserResponseDTO;
import com.spl.wordle.dto.UserRequestDTO;
import com.spl.wordle.entity.User;
import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {
    UserResponseDTO responseMap(User user);

    @InheritInverseConfiguration
    User responseMap(UserResponseDTO dto);

    UserRequestDTO requestMap(User user);

    @InheritInverseConfiguration
    User requestMap(UserRequestDTO dto);

}