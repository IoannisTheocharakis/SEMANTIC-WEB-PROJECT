/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package classes;

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
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 *
 * @author Theo
 */
public class QueriesForWebApp {

    String retrieveBasicStatistics = "select * where {?s ?p ?o . filter(!isBlank(?o))}";

    String retrieveProperties = "SELECT ?prop ?triples ?count WHERE { { SELECT (COUNT(*) AS ?count) WHERE { ?s void:propertyPartition ?o . ?o void:property ?prop . ?o void:triples ?triples } } ?s void:propertyPartition ?o . ?o void:property ?prop . ?o void:triples ?triples } ORDER BY DESC(xsd:integer(?triples)) limit <limit> offset <offset>";
    String retrieveCRMProperties = "SELECT ?prop ?triples ?count WHERE { { SELECT (COUNT(*) AS ?count) where {?s void:propertyPartition ?o . ?o void:property ?prop . ?o void:triples ?triples .filter(regex(?prop,'crm')) } } ?s void:propertyPartition ?o . ?o void:property ?prop . ?o void:triples ?triples .filter(regex(?prop,'crm')) } order by desc (xsd:Integer(?triples)) limit <limit> offset <offset>";
    //String retrieveProperties = "select ?prop ?triples where {?s void:propertyPartition ?o . ?o void:property ?prop . ?o void:triples ?triples} order by desc (xsd:Integer(?triples)) limit <limit> offset <offset>";
    //String retrieveCRMProperties = "select ?prop ?triples where {?s void:propertyPartition ?o . ?o void:property ?prop . ?o void:triples ?triples .filter(regex(?prop,'crm'))} order by desc (xsd:Integer(?triples)) limit <limit> offset <offset>";

    String retrieveClasses = "select ?class ?triples ?count { { SELECT (COUNT(*) AS ?count) where {?s void:classPartition ?o . ?o void:class ?class . ?o void:triples ?triples } } ?s void:classPartition ?o . ?o void:class ?class . ?o void:triples ?triples} order by desc (xsd:Integer(?triples)) limit <limit> offset <offset>";
    String retrieveCRMClasses = "select ?class ?triples ?count { { SELECT (COUNT(*) AS ?count) where {?s void:classPartition ?o . ?o void:class ?class . ?o void:triples ?triples .filter(regex(?class,'crm'))}} ?s void:classPartition ?o . ?o void:class ?class . ?o void:triples ?triples .filter(regex(?class,'crm'))} order by desc (xsd:Integer(?triples)) limit <limit> offset <offset>";
    //String retrieveClasses = "select ?class ?triples where {?s void:classPartition ?o . ?o void:class ?class . ?o void:triples ?triples} order by desc (xsd:Integer(?triples))";
    //String retrieveCRMClasses = "select ?class ?triples where {?s void:classPartition ?o . ?o void:class ?class . ?o void:triples ?triples .filter(regex(?class,'crm'))} order by desc (xsd:Integer(?triples))";

    String retrieveCommonProperties = "select ?prop where {?s void:propertyPartition ?o . ?o void:property ?prop . ?s2 void:propertyPartition ?o2 . ?o2 void:property ?prop}";
    String retrieveCommonCRMProperties = "select ?prop where {?s void:propertyPartition ?o . ?o void:property ?prop . ?s2 void:propertyPartition ?o2 . ?o2 void:property ?prop .filter(regex(?prop,'crm'))}";

    String retrieveCommonClasses = "select ?class where {?s void:classPartition ?o . ?o void:class ?class . ?s2 void:classPartition ?o2 . ?o2 void:class ?class}";
    String retrieveCommonCRMClasses = "select ?class where {?s void:classPartition ?o . ?o void:class ?class . ?s2 void:classPartition ?o2 . ?o2 void:class ?class .filter(regex(?class,'crm'))}";

    String retrieveDatasetsAndTheirTitle = "select ?s ?title ?triples where {?s a void:Dataset . ?s <http://purl.org/dc/terms/title> ?title . ?s void:triples ?triples}";
    String endpoint = "http://83.212.97.78:8890/sparql";

    public List<Dataset> retrieveAllDatasetsAndTheirTitle() throws UnsupportedEncodingException, MalformedURLException, IOException {
        String query = retrieveDatasetsAndTheirTitle;
        String sparqlQueryURL = endpoint + "?query=" + URLEncoder.encode(query, "utf8");
        URL url = new URL(sparqlQueryURL);
        URLConnection con = url.openConnection();
        String type = "text/tab-separated-values";
        con.setRequestProperty("ACCEPT", type);

        InputStream is = con.getInputStream();
        InputStreamReader isr = new InputStreamReader(is, "utf8");
        BufferedReader in = new BufferedReader(isr);

        String input;
        List<Dataset> datasets = new ArrayList<>();
        int arrCounter = 0;
        int datasetsCounter = 0;
        String[] arrOfStrings = new String[3];
        while ((input = in.readLine()) != null) {
            System.out.println(input);
            arrOfStrings = input.split("\t");
            for (arrCounter = 0; arrCounter < 3; arrCounter++) {
                arrOfStrings[arrCounter] = arrOfStrings[arrCounter].substring(1, arrOfStrings[arrCounter].length() - 1);
            }
            Dataset dat = new Dataset();
            dat.setDatasetStandarInfo(datasetsCounter, arrOfStrings[0], arrOfStrings[1], arrOfStrings[2]);
            datasets.add(dat);
            //my ID;
            datasetsCounter++;
        }
        in.close();
        isr.close();
        is.close();
        return datasets;
    }

    public void getBasicStatistics(String dataset) throws UnsupportedEncodingException, MalformedURLException, IOException {
        String query = retrieveBasicStatistics.replace("?s", "<" + dataset + ">");
        String sparqlQueryURL = endpoint + "?query=" + URLEncoder.encode(query, "utf8");
        URL url = new URL(sparqlQueryURL);
        URLConnection con = url.openConnection();
        String type = "text/tab-separated-values";
        con.setRequestProperty("ACCEPT", type);

        InputStream is = con.getInputStream();
        InputStreamReader isr = new InputStreamReader(is, "utf8");
        BufferedReader in = new BufferedReader(isr);

        String input;
        String resultsString = "";
        int count = 0;
        while ((input = in.readLine()) != null) {
            System.out.println(input);
        }

        in.close();
        isr.close();
        is.close();
    }

    public List<Property> getAllProperties(String dataset, boolean onlyCIDOC, int limit, int page) throws UnsupportedEncodingException, MalformedURLException, IOException {

        String query = "";
        if (!onlyCIDOC) {
            query = this.retrieveProperties.replace("?s", "<" + dataset + ">");
        } else {
            query = this.retrieveCRMProperties.replace("?s", "<" + dataset + ">");
        }
        page = 10 * page;
        query = query.replace("<limit>", Integer.toString(limit));
        query = query.replace("<offset>", Integer.toString(page));
        System.out.println(query);
        String sparqlQueryURL = endpoint + "?query=" + URLEncoder.encode(query, "utf8");
        URL url = new URL(sparqlQueryURL);
        URLConnection con = url.openConnection();
        String type = "text/tab-separated-values";
        con.setRequestProperty("ACCEPT", type);

        InputStream is = con.getInputStream();
        InputStreamReader isr = new InputStreamReader(is, "utf8");
        BufferedReader in = new BufferedReader(isr);

        String input;
        List<Property> properties = new ArrayList<>();
        int arrCounter = 0;
        int propertiesCounter = 0;
        String[] arrOfStrings = new String[3];
        while ((input = in.readLine()) != null) {
            if (propertiesCounter == 0) {
                propertiesCounter++;
                continue;
            }
            System.out.println(input);
            arrOfStrings = input.split("\t");
            for (arrCounter = 0; arrCounter < 2; arrCounter++) {
                arrOfStrings[arrCounter] = arrOfStrings[arrCounter].substring(1, arrOfStrings[arrCounter].length() - 1);
            }
            System.out.println(arrOfStrings[2]);

            Property prop = new Property(propertiesCounter, arrOfStrings[0], Integer.parseInt(arrOfStrings[1]), Integer.parseInt(arrOfStrings[2]));
            properties.add(prop);
            propertiesCounter++;
        }
        in.close();
        isr.close();
        is.close();
        return properties;
    }

    public List<RDFClass> getAllClasses(String dataset, boolean onlyCIDOC, int limit, int page) throws UnsupportedEncodingException, MalformedURLException, IOException {

        String query = "";
        if (!onlyCIDOC) {
            query = this.retrieveClasses.replace("?s", "<" + dataset + ">");
        } else {
            query = this.retrieveCRMClasses.replace("?s", "<" + dataset + ">");
        }

        page = 10 * page;
        query = query.replace("<limit>", Integer.toString(limit));
        query = query.replace("<offset>", Integer.toString(page));

        System.out.println(query);

        String sparqlQueryURL = endpoint + "?query=" + URLEncoder.encode(query, "utf8");
        URL url = new URL(sparqlQueryURL);
        URLConnection con = url.openConnection();
        String type = "text/tab-separated-values";
        con.setRequestProperty("ACCEPT", type);

        InputStream is = con.getInputStream();
        InputStreamReader isr = new InputStreamReader(is, "utf8");
        BufferedReader in = new BufferedReader(isr);

        String input;
        List<RDFClass> rdfClasses = new ArrayList<>();
        int arrCounter = 0;
        int rdfClassesCounter = 0;
        String[] arrOfStrings = new String[3];
        while ((input = in.readLine()) != null) {
            if (rdfClassesCounter == 0) {
                rdfClassesCounter++;
                continue;
            }
            System.out.println(input);
            arrOfStrings = input.split("\t");
            for (arrCounter = 0; arrCounter < 2; arrCounter++) {
                arrOfStrings[arrCounter] = arrOfStrings[arrCounter].substring(1, arrOfStrings[arrCounter].length() - 1);
            }
            RDFClass rdfClass = new RDFClass(rdfClassesCounter, arrOfStrings[0], Integer.parseInt(arrOfStrings[1]), Integer.parseInt(arrOfStrings[2]));
            rdfClasses.add(rdfClass);
            rdfClassesCounter++;
        }
        in.close();
        isr.close();
        is.close();
        return rdfClasses;
    }

    public void getCommonProperties(String dataset1, String dataset2, boolean onlyCIDOC) throws UnsupportedEncodingException, MalformedURLException, IOException {
        String query = "";
        if (!onlyCIDOC) {
            query = this.retrieveCommonProperties.replace("?s2", "<" + dataset2 + ">").replace("?s", "<" + dataset1 + ">");
        } else {
            query = this.retrieveCommonCRMProperties.replace("?s2", "<" + dataset2 + ">").replace("?s", "<" + dataset1 + ">");
        }
        //System.out.println(query);
        String sparqlQueryURL = endpoint + "?query=" + URLEncoder.encode(query, "utf8");
        URL url = new URL(sparqlQueryURL);
        URLConnection con = url.openConnection();
        String type = "text/tab-separated-values";
        con.setRequestProperty("ACCEPT", type);

        InputStream is = con.getInputStream();
        InputStreamReader isr = new InputStreamReader(is, "utf8");
        BufferedReader in = new BufferedReader(isr);

        String input;
        String resultsString = "";
        int count = 0;
        while ((input = in.readLine()) != null) {
            System.out.println(input);
        }
        in.close();
        isr.close();
        is.close();
    }

    public void getCommonClasses(String dataset1, String dataset2, boolean onlyCIDOC) throws UnsupportedEncodingException, MalformedURLException, IOException {
        String query = "";
        if (!onlyCIDOC) {
            query = this.retrieveCommonClasses.replace("?s2", "<" + dataset2 + ">").replace("?s", "<" + dataset1 + ">");
        } else {
            query = this.retrieveCommonCRMClasses.replace("?s2", "<" + dataset2 + ">").replace("?s", "<" + dataset1 + ">");
        }
        //System.out.println(query);
        String sparqlQueryURL = endpoint + "?query=" + URLEncoder.encode(query, "utf8");
        URL url = new URL(sparqlQueryURL);
        URLConnection con = url.openConnection();
        String type = "text/tab-separated-values";
        con.setRequestProperty("ACCEPT", type);

        InputStream is = con.getInputStream();
        InputStreamReader isr = new InputStreamReader(is, "utf8");
        BufferedReader in = new BufferedReader(isr);

        String input;
        String resultsString = "";
        int count = 0;
        while ((input = in.readLine()) != null) {
            System.out.println(input);
        }
        in.close();
        isr.close();
        is.close();
    }

}
/*
SELECT ?prop ?triples ?count
WHERE {
  {
    SELECT (COUNT(*) AS ?count)
    WHERE {
      <http://ldf.fi/ww1lod/sparql> void:propertyPartition ?o .
        ?o void:property ?prop .
        ?o void:triples ?triples
    }
  }
  <http://ldf.fi/ww1lod/sparql> void:propertyPartition ?o .
  ?o void:property ?prop .
  ?o void:triples ?triples
}
ORDER BY DESC(xsd:integer(?triples))

 */
