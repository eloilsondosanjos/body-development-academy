const fs = require("fs");
const data = require("../data.json");
const { age, date, formatDate } = require("../utils");

exports.index = function (req, res) {
  return res.render("instructors/index.njk", { instructors: data.instructors });
};

exports.list = function (req, res) {
  const { id } = req.params;

  const foundInstructor = data.instructors.find(function (instructor) {
    return instructor.id == id;
  });

  if (!foundInstructor) {
    return res.send("Instructor not found");
  }

  const instructor = {
    ...foundInstructor,
    age: age(foundInstructor.birth),
    services: foundInstructor.services.split(","),
    created_at: formatDate(
      foundInstructor.created_at
    ) /*new Intl.DateTimeFormat("pt-BR").format(
      foundInstructor.created_at*/,
  };

  return res.render("instructors/show.njk", { instructor });
};

exports.create = function (req, res) {
  return res.render("instructors/create.njk");
};

exports.post = function (req, res) {
  const keys = Object.keys(req.body);

  for (key of keys) {
    if (req.body[key] == "") {
      return res.send("Please, fill all fields!");
    }
  }

  let { avatar_url, birth, name, services, gender } = req.body;

  birth = Date.parse(birth);
  const created_at = Date.now();
  const id = Number(data.instructors.length);

  data.instructors.push({
    id,
    avatar_url,
    name,
    birth,
    gender,
    services,
    created_at,
  });

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
    if (err) return res.send("Write file error!");

    return res.redirect("/instructors");
  });
};

exports.edit = function (req, res) {
  const { id } = req.params;

  const foundInstructor = data.instructors.find(function (instructor) {
    return instructor.id == id;
  });

  if (!foundInstructor) {
    return res.send("Instructor not found");
  }

  const instructor = {
    ...foundInstructor,
    birth: date(foundInstructor.birth),
  };

  return res.render("instructors/edit.njk", { instructor });
};

exports.put = function (req, res) {
  const { id } = req.body;
  let index = 0;

  const foundInstructor = data.instructors.find(function (
    instructor,
    foundIndex
  ) {
    if (id == instructor.id) {
      index = foundIndex;
      return true;
    }
  });

  if (!foundInstructor) {
    return res.send("Instructor not found");
  }

  const instructor = {
    ...foundInstructor,
    ...req.body,
    birth: Date.parse(req.body.birth),
    id: Number(req.body.id),
  };

  data.instructors[index] = instructor;

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
    if (err) return res.send("Write error!");

    return res.redirect(`/instructors/${id}`);
  });
};

exports.delete = function (req, res) {
  const { id } = req.body;

  const filteredIntructors = data.instructors.filter(function (instructor) {
    return instructor.id != id;
  });

  data.instructors = filteredIntructors;

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
    if (err) return res.send("Write file error");

    return res.redirect("/instructors");
  });
};
