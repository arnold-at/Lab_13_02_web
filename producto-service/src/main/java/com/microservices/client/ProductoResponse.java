package com.microservices.client;

import com.microservices.dto.Categoria;
import com.microservices.model.Producto;
import lombok.Data;

@Data
public class ProductoResponse {

    private Producto producto;

    private Categoria categoria;
}
