package com.spl.authservice.mapper;

import com.spl.authservice.dto.UserRequestDTO;
import com.spl.authservice.dto.UserResponseDTO;
import com.spl.authservice.entity.User;
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