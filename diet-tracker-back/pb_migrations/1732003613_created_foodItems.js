/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "nvohrx5chlg36jn",
    "created": "2024-11-19 08:06:53.912Z",
    "updated": "2024-11-19 08:06:53.912Z",
    "name": "foodItems",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "pxpo4p5o",
        "name": "title",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("nvohrx5chlg36jn");

  return dao.deleteCollection(collection);
})
