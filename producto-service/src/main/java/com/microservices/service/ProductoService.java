package com.microservices.service;

import com.microservices.client.CategoriaClient;
import com.microservices.client.ProductoResponse;
import com.microservices.dto.Categoria;
import com.microservices.model.Producto;
import com.microservices.repository.ProductoRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class ProductoService {

    @Autowired
    private ProductoRepository productoRepository;

    @Autowired
    private CategoriaClient categoriaClient;

    public List<Producto> listarTodos() {
        return productoRepository.findAll();
    }

    public ProductoResponse buscarPorId(Long id) {
        Optional<Producto> productoOptional = productoRepository.findById(id);

        if (productoOptional.isEmpty()) {
            return null;
        }

        Producto producto = productoOptional.get();
        ProductoResponse productoResponse = new ProductoResponse();
        productoResponse.setProducto(producto);

        try {
            Categoria categoria = categoriaClient.obtenerCategoria(producto.getCategoriaId());
            productoResponse.setCategoria(categoria);
        } catch (Exception e) {
            productoResponse.setCategoria(null);
        }

        return productoResponse;
    }

    public Producto guardarProducto(Producto producto) {
        return productoRepository.save(producto);
    }

    public Producto actualizarProducto(Long id, Producto datosProducto) {
        return productoRepository.findById(id).map(productoExistente -> {
            productoExistente.setNombre(datosProducto.getNombre());
            productoExistente.setPrecio(datosProducto.getPrecio());
            productoExistente.setCategoriaId(datosProducto.getCategoriaId());
            return productoRepository.save(productoExistente);
        }).orElse(null);
    }

    public boolean eliminarProducto(Long id) {
        if (productoRepository.existsById(id)) {
            productoRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
