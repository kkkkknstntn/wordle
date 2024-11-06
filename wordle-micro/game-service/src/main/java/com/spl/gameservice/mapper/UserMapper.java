package com.spl.gameservice.mapper;

import com.spl.gameservice.dto.UserResponseDTO;
import com.spl.gameservice.entity.User;
import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {
    UserResponseDTO responseMap(User user);

    @InheritInverseConfiguration
    User responseMap(UserResponseDTO dto);
}