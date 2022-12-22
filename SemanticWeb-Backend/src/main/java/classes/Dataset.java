/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package classes;

/**
 *
 * @author Theo
 */
public class Dataset {

    public String datasetName;
    public String url;
    public String description;
    public String creator;
    public int numberOfTriples;
    public int numberOfEntities;
    public int numberOfDistinceSubjects;

    public Dataset(String datasetName, String url, String description, String creator, int numberOfTriples, int numberOfEntities, int numberOfDistinceSubjects) {
        this.datasetName = datasetName;
        this.url = url;
        this.description = description;
        this.creator = creator;
        this.numberOfTriples = numberOfTriples;
        this.numberOfEntities = numberOfEntities;
        this.numberOfDistinceSubjects = numberOfDistinceSubjects;
    }

    public String getDatasetName() {
        return datasetName;
    }

}
