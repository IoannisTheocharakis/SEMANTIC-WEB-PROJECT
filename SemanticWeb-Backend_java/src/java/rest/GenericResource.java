/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/WebServices/GenericResource.java to edit this template
 */
package rest;

import classes.Dataset;
import com.google.gson.Gson;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.HeaderParam;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.QueryParam;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.net.URL;
import java.net.URLConnection;
import java.net.URLEncoder;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLConnection;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.HashMap;

/**
 * REST Web Service
 *
 * @author Theo
 */
@Path("database")
public class GenericResource {

    static HashMap<String, Laptop> laptops = new HashMap<>();
    static HashMap<String, Dataset> datasets = new HashMap<>();

    public GenericResource() {
        if (laptops.isEmpty()) {
            Laptop p = new Laptop("Toshiba", "Toshiba_Satellite", "i5", "8GB", 15);
            Laptop p1 = new Laptop("Toshiba", "Toshiba_satellite_PRO", "i7", "16GB", 15);
            Laptop p2 = new Laptop("Dell", "Dell_A", "i5", "8GB", 150);
            laptops.put(p.name, p);
            laptops.put(p1.name, p1);
            laptops.put(p2.name, p2);
        }
        if (datasets.isEmpty()) {
            Dataset dataset0 = new Dataset("FirstDatabase", "http://ldf.fi/ww1lod/sparql", "First Database", "Giannhs Theocharakis", 1000, 1000, 1000);
            Dataset dataset1 = new Dataset("SecondDatabase", "http", "Second Database", "Giannhs Theocharakis", 1200, 1300, 1400);
            datasets.put(dataset0.datasetName, dataset0);
            datasets.put(dataset1.datasetName, dataset1);
        }
    }

    @GET
    @Path("/laptops")
    @Produces({MediaType.APPLICATION_JSON})
    public Response getAllLaptops() {
        Response.Status status = Response.Status.OK;
        String json = new Gson().toJson(laptops.values());
        return Response.status(status).type("application/json").entity(json).build();
    }

    /**
     * Retrieves representation of an instance of restApi.GenericResource
     *
     * @param brand
     * @param id
     * @return an instance of java.lang.String
     */
    @GET
    @Path("/laptops/{brand}")
    @Produces({MediaType.APPLICATION_JSON})
    public Response getLaptop(@PathParam("brand") String brand) {
        Response.Status status = Response.Status.OK;
        ArrayList<Laptop> laptopsWithBrand = new ArrayList<Laptop>();
        for (Laptop l : laptops.values()) {
            if (l.brand.equals(brand)) {
                laptopsWithBrand.add(l);
            }
        }
        if (!laptopsWithBrand.isEmpty()) {
            String json = new Gson().toJson(laptopsWithBrand);
            return Response.status(status).type("application/json").entity(json).build();
        } else {
            return Response.status(Response.Status.BAD_REQUEST).type("application/json").entity("{\"error\":\"Laptop Brand not exists\"}").build();
        }
    }

    @GET
    @Path("/laptopsWithSpecs/{memory}")
    @Produces({MediaType.APPLICATION_JSON})
    public Response getLaptopWithMemory(@PathParam("memory") String memory,
            @QueryParam("core") String core) {
        Response.Status status = Response.Status.OK;
        ArrayList<Laptop> laptopsWithMemory = new ArrayList<Laptop>();
        for (Laptop l : laptops.values()) {
            if (l.memory.equals(memory) && (core == null || l.core.equals(core))) {
                laptopsWithMemory.add(l);
            }
        }
        String json = new Gson().toJson(laptopsWithMemory);
        return Response.status(status).type("application/json").entity(json).build();
    }

    @POST
    @Path("/newLaptop")
    @Consumes({MediaType.APPLICATION_JSON})
    @Produces({MediaType.APPLICATION_JSON})
    public Response addLaptop(String laptop) {
        Gson gson = new Gson();
        Laptop lap = gson.fromJson(laptop, Laptop.class);
        if (laptops.containsKey(lap.name)) {
            return Response.status(Response.Status.CONFLICT).type("application/json").entity("{\"error\":\"Laptop Exists\"}").build();
        } else {
            laptops.put(lap.name, lap);
            return Response.status(Response.Status.OK).type("application/json").entity("{\"success\":\"Laptop Added\"}").build();
        }
    }

    @PUT
    @Path("/laptopQuantity/{name}/{quantity}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response updateLaptop(@PathParam("name") String name, @PathParam("quantity") int quantity, @HeaderParam("Accept") String acceptHeader) {
        if (laptops.containsKey(name) == false) {
            return Response.status(Response.Status.NOT_FOUND).type("application/json").entity("{\"error\":\"Laptop Does not Exists\"}").build();
        } else if (quantity <= 0) {
            return Response.status(Response.Status.NOT_ACCEPTABLE).type("application/json").entity("{\"error\":\"Quantity must be over 0\"}").build();
        } else {
            Laptop p = laptops.get(name);
            p.quantity += quantity;
            return Response.status(Response.Status.OK).type("application/json").entity("{\"success\":\"Quantity Updated\"}").build();
        }
    }

    @DELETE
    @Path("/laptop/{name}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response deleteLaptop(@PathParam("name") String name) {
        Response.Status status = Response.Status.OK;
        if (laptops.containsKey(name)) {
            laptops.remove(name);
            return Response.status(status).type("application/json").entity("{\"success\":\"Laptop Deleted\"}").build();
        } else {
            return Response.status(Response.Status.NOT_FOUND).type("application/json").entity("{\"error\":\"Laptop Does not Exists\"}").build();
        }
    }

    //--------------------------------------------------------------------------
    @GET
    @Path("/datasets")
    @Produces({MediaType.APPLICATION_JSON})
    public Response getAllDatasets() {
        Response.Status status = Response.Status.OK;
        String json = new Gson().toJson(datasets.values());
        return Response.status(status).type("application/json").entity(json).build();
    }

    @POST
    @Path("/newDataset")
    @Consumes({MediaType.APPLICATION_JSON})
    @Produces({MediaType.APPLICATION_JSON})
    public Response addDataset(String Dataset) {
        Gson gson = new Gson();
        Dataset dataset = gson.fromJson(Dataset, Dataset.class);
        if (datasets.containsKey(dataset.datasetName)) {
            return Response.status(Response.Status.CONFLICT).type("application/json").entity("{\"error\":\"Dataset Exists\"}").build();
        } else {
            datasets.put(dataset.datasetName, dataset);
            return Response.status(Response.Status.OK).type("application/json").entity("{\"success\":\"Dataset Added\"}").build();
        }
    }

    @GET
    @Path("/databaseRequest")
    @Produces({MediaType.APPLICATION_JSON})
    public Response getDatabaseRequest() throws UnsupportedEncodingException, MalformedURLException, IOException {
        String endpoint = "http://ldf.fi/ww1lod/sparql";
        //https://code.google.com/archive/p/void-impl/wikis/SPARQLQueriesForStatistics.wiki
        String query = "SELECT ?class (COUNT(?s) AS ?count) { ?s a ?class } GROUP BY ?class ORDER BY ?count";
        String sparqlQueryURL = endpoint + "?query=" + URLEncoder.encode(query, "utf8");
        URL url = new URL(sparqlQueryURL);
        URLConnection con = url.openConnection();
        String type = "text/tab-separated-values";
        con.setRequestProperty("ACCEPT", type);
        InputStream is = con.getInputStream();
        InputStreamReader isr = new InputStreamReader(is, "utf8");
        BufferedReader in = new BufferedReader(isr);
        String inputToString = "";
        String input;
        String resultsString = "";
        int count = 0;
        System.out.println("HERE");

        while ((input = in.readLine()) != null) {
            inputToString += input;
            inputToString += "\n";
        }
        in.close();
        isr.close();
        is.close();
        System.out.println("THERE");
        System.out.println(inputToString);
        Response.Status status = Response.Status.OK;
        return Response.status(status).type("application/json").build();
    }
}
