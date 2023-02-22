/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.SemanticWebBackend;

import classes.Dataset;
import classes.Property;
import requestClasses.RequestDatabase;
import classes.QueriesForWebApp;
import classes.RDFClass;
import com.google.gson.Gson;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLConnection;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Theo
 */
@RestController
@CrossOrigin
public class DatasetController {

    static List<Dataset> datasets = new ArrayList<>();

    public DatasetController() {
    }

    @GetMapping("/datasets/map")
    public List<Dataset> getAllDatasets() {
        return datasets;
    }

    @GetMapping("/URLdatasets")
    public String getDatabaseRequest() throws UnsupportedEncodingException, MalformedURLException, IOException {
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
        return inputToString;
    }

    @GetMapping("/datasets")
    public List<Dataset> getAlldatasets() throws IOException {
        QueriesForWebApp queries = new QueriesForWebApp();
        //get all datasets
        List<Dataset> datasets = new ArrayList<>();
        datasets = queries.retrieveAllDatasetsAndTheirTitle();
        return datasets;
    }

    @PostMapping("/dataset/properties")
    public List<Property> getProperties(@RequestBody RequestDatabase req) throws IOException {
        QueriesForWebApp queries = new QueriesForWebApp();
        //get all datasets
        List<Property> properties = new ArrayList<>();
        properties = queries.getAllProperties(req.endpoint, req.onlyCidoc, req.limit, req.page);
        return properties;
    }

    @PostMapping("/dataset/rdfClasses")
    public List<RDFClass> getClasses(@RequestBody RequestDatabase req) throws IOException {
        QueriesForWebApp queries = new QueriesForWebApp();
        //get all datasets
        List<RDFClass> rdfClasses = new ArrayList<>();
        rdfClasses = queries.getAllClasses(req.endpoint, req.onlyCidoc, req.limit, req.page);
        return rdfClasses;
    }

}

//
//    /**
//     * @param args the command line arguments
//     */
//    public static void main(String[] args) throws IOException {
//        //Dataset ww1lod = new Dataset("WW1LOD", "Data about World War 1", "http://ldf.fi/ww1lod/sparql");
//
////        ww1lod.runQueries();
////        ww1lod.datasetToVoID();
////        ww1lod.storeStatsToFile();
////        ww1lod.uploadFilesToVirtuoso();
//
////        Dataset smith = new Dataset("American Art Museum", "Art", "https://triplydb.com/smithsonian/american-art-museum/sparql/american-art-museum");
////
////        smith.runQueries();
////        smith.datasetToVoID();
////        smith.storeStatsToFile();
////        smith.uploadFilesToVirtuoso();
//
//        
//
//
//        String dataset = "http://ldf.fi/ww1lod/sparql";
//
//        QueriesForWebApp queries = new QueriesForWebApp();
//        
//        
//        //gia vasiki othoni
//        queries.retrieveAllDatasetsAndTheirTitle();
//        
//        queries.getBasicStatistics(dataset);
//        System.out.println("=========");
//        boolean onlyCIDOC=true;
//        queries.getAllProperties(dataset, onlyCIDOC);
//           System.out.println("=========");
//        queries.getAllClasses(dataset, onlyCIDOC);
//
//        //connectivity me alla dataset
//        System.out.println("Get Common Properties between two datasets");
//        String dataset2 = "https://triplydb.com/smithsonian/american-art-museum/sparql/american-art-museum";
//        queries.getCommonProperties(dataset, dataset2, true);
//
//        System.out.println("Get Common Classes between two datasets");
//
//        queries.getCommonClasses(dataset, dataset2, true);
//    }
