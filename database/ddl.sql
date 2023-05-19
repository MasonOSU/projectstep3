CREATE TABLE IF NOT EXISTS `Research_Papers` (
  `research_paper_id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(100) NOT NULL,
  `date_published` DATE NOT NULL,
  `doi` VARCHAR(100) NOT NULL,
  `institution_id` INT,
  `discipline_id` INT NOT NULL,
  PRIMARY KEY (`research_paper_id`),
  INDEX `discipline_id_idx` (`discipline_id` ASC) VISIBLE,
  INDEX `institution_id_idx` (`institution_id` ASC) VISIBLE,
  CONSTRAINT `discipline_id` FOREIGN KEY (`discipline_id`) REFERENCES `Disciplines` (`discipline_id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `institution_id` FOREIGN KEY (`institution_id`) REFERENCES `Institutions` (`institution_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
);

CREATE TABLE IF NOT EXISTS `Citations` (
  `citation_id` INT NOT NULL AUTO_INCREMENT,
  `citing_paper_id` INT NOT NULL,
  `cited_paper_id` INT NOT NULL,
  PRIMARY KEY (`citation_id`),
  CONSTRAINT `fk_citing_paper_id` FOREIGN KEY (`citing_paper_id`) REFERENCES `Research_Papers` (`research_paper_id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `fk_cited_paper_id` FOREIGN KEY (`cited_paper_id`) REFERENCES `Research_Papers` (`research_paper_id`) ON DELETE CASCADE ON UPDATE NO ACTION
);

CREATE TABLE IF NOT EXISTS `Authors` (
  `author_id` INT NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(20) NOT NULL,
  `last_name` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`author_id`)
);

CREATE TABLE IF NOT EXISTS `Institutions` (
  `institution_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NOT NULL,
  `address` VARCHAR(50) NOT NULL,
  `country` VARCHAR(100) NOT NULL,
  `website` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`institution_id`)
);

CREATE TABLE IF NOT EXISTS `Disciplines` (
  `discipline_id` INT NOT NULL AUTO_INCREMENT,
  `field` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`discipline_id`)
);

CREATE TABLE IF NOT EXISTS `Research_Papers_has_Authors` (
  `research_paper_author_id` INT NOT NULL AUTO_INCREMENT,
  `research_paper_id` INT NOT NULL,
  `author_id` INT NOT NULL,
  PRIMARY KEY (`research_paper_author_id`),
  INDEX `fk_Research_Papers_has_Authors_Authors1_idx` (`author_id` ASC) VISIBLE,
  INDEX `fk_Research_Papers_has_Authors_Research_Papers1_idx` (`research_paper_id` ASC) VISIBLE,
  CONSTRAINT `fk_Research_Papers_has_Authors_Research_Papers1` FOREIGN KEY (`research_paper_id`) REFERENCES `Research_Papers` (`research_paper_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Research_Papers_has_Authors_Authors1` FOREIGN KEY (`author_id`) REFERENCES `Authors` (`author_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
);

INSERT INTO
  `Disciplines` (`field`)
VALUES
  ('Biology'),
  ('Literature'),
  ('History'),
  ('Psychology');

INSERT INTO
  `Authors` (`first_name`, `last_name`)
VALUES
  ('Nina', 'Faulkner'),
  ('Robert', 'Ball'),
  ('John', 'Smith'),
  ('Sandra', 'Smith'),
  ('Maria', 'Thompson');

INSERT INTO
  `Institutions` (`name`, `address`, `country`, `website`)
VALUES
  (
    'Samoa University',
    '2370 Clover Drive, Colorado Springs, Colorado',
    'United States',
    'samoa.edu'
  ),
  (
    'Weston Biological Institute',
    '1671 Johnstown Road, Winnetka, New York',
    'United States',
    'westonbio.edu'
  ),
  (
    'Smith and Harper College',
    '4628 Hazelwood Avenue, London',
    'United Kingdom',
    'shcollege.edu'
  );

INSERT INTO
  `Research_Papers` (
    `title`,
    `date_published`,
    `doi`,
    `institution_id`,
    `discipline_id`
  )
VALUES
  (
    'Grapefruit Juice Interactions with Antipsychotic Medicine',
    '1980-10-29',
    '10.1991/1123',
    (
      SELECT
        `institution_id`
      FROM
        `Institutions`
      WHERE
        `name` = 'Weston Biological Institute'
    ),
    (
      SELECT
        `discipline_id`
      FROM
        `Disciplines`
      WHERE
        `field` = 'Biology'
    )
  ),
  (
    'Celtic Tradition in Beowulf',
    '1999-01-03',
    '10.9932/1939',
    (
      SELECT
        `institution_id`
      FROM
        `Institutions`
      WHERE
        `name` = 'Smith and Harper College'
    ),
    (
      SELECT
        `discipline_id`
      FROM
        `Disciplines`
      WHERE
        `field` = 'Literature'
    )
  ),
  (
    'Schizophrenia Treatment Models',
    '1997-04-09',
    '10.0001/9634',
    (
      SELECT
        `institution_id`
      FROM
        `Institutions`
      WHERE
        `name` = 'Samoa University'
    ),
    (
      SELECT
        `discipline_id`
      FROM
        `Disciplines`
      WHERE
        `field` = 'Psychology'
    )
  ),
  (
    'An Overview of Antipsychotic Drug Kinetics',
    '1978-05-13',
    '10.0193/9294',
    NULL,
    (
      SELECT
        `discipline_id`
      FROM
        `Disciplines`
      WHERE
        `field` = 'Biology'
    )
  ),
  (
    'Anglo-Saxon Class Dynamics and Migration',
    '1991-07-21',
    '10.1111/2345',
    (
      SELECT
        `institution_id`
      FROM
        `Institutions`
      WHERE
        `name` = 'Smith and Harper College'
    ),
    (
      SELECT
        `discipline_id`
      FROM
        `Disciplines`
      WHERE
        `field` = 'History'
    )
  );

INSERT INTO
  `Citations` (`citing_paper_id`, `cited_paper_id`)
VALUES
  (
    (
      SELECT
        `research_paper_id`
      FROM
        `Research_Papers`
      WHERE
        `title` = 'Grapefruit Juice Interactions with Antipsychotic Medicine'
    ),
    (
      SELECT
        `research_paper_id`
      FROM
        `Research_Papers`
      WHERE
        `title` = 'An Overview of Antipsychotic Drug Kinetics'
    )
  ),
  (
    (
      SELECT
        `research_paper_id`
      FROM
        `Research_Papers`
      WHERE
        `title` = 'Celtic Tradition in Beowulf'
    ),
    (
      SELECT
        `research_paper_id`
      FROM
        `Research_Papers`
      WHERE
        `title` = 'Anglo-Saxon Class Dynamics and Migration'
    )
  ),
  (
    (
      SELECT
        `research_paper_id`
      FROM
        `Research_Papers`
      WHERE
        `title` = 'Schizophrenia Treatment Models'
    ),
    (
      SELECT
        `research_paper_id`
      FROM
        `Research_Papers`
      WHERE
        `title` = 'An Overview of Antipsychotic Drug Kinetics'
    )
  ),
  (
    (
      SELECT
        `research_paper_id`
      FROM
        `Research_Papers`
      WHERE
        `title` = 'Celtic Tradition in Beowulf'
    ),
    (
      SELECT
        `research_paper_id`
      FROM
        `Research_Papers`
      WHERE
        `title` = 'Schizophrenia Treatment Models'
    )
  );

INSERT INTO
  `Research_Papers_has_Authors` (`research_paper_id`, `author_id`)
VALUES
  (
    (
      SELECT
        `research_paper_id`
      FROM
        `Research_Papers`
      WHERE
        `title` = 'Grapefruit Juice Interactions with Antipsychotic Medicine'
    ),
    (
      SELECT
        `author_id`
      FROM
        `Authors`
      WHERE
        `first_name` = 'Nina'
        AND `last_name` = 'Faulkner'
    )
  ),
  (
    (
      SELECT
        `research_paper_id`
      FROM
        `Research_Papers`
      WHERE
        `title` = 'Grapefruit Juice Interactions with Antipsychotic Medicine'
    ),
    (
      SELECT
        `author_id`
      FROM
        `Authors`
      WHERE
        `first_name` = 'Robert'
        AND `last_name` = 'Ball'
    )
  ),
  (
    (
      SELECT
        `research_paper_id`
      FROM
        `Research_Papers`
      WHERE
        `title` = 'Celtic Tradition in Beowulf'
    ),
    (
      SELECT
        `author_id`
      FROM
        `Authors`
      WHERE
        `first_name` = 'Nina'
        AND `last_name` = 'Faulkner'
    )
  ),
  (
    (
      SELECT
        `research_paper_id`
      FROM
        `Research_Papers`
      WHERE
        `title` = 'Schizophrenia Treatment Models'
    ),
    (
      SELECT
        `author_id`
      FROM
        `Authors`
      WHERE
        `first_name` = 'John'
        AND `last_name` = 'Smith'
    )
  ),
  (
    (
      SELECT
        `research_paper_id`
      FROM
        `Research_Papers`
      WHERE
        `title` = 'An Overview of Antipsychotic Drug Kinetics'
    ),
    (
      SELECT
        `author_id`
      FROM
        `Authors`
      WHERE
        `first_name` = 'Sandra'
        AND `last_name` = 'Smith'
    )
  ),
  (
    (
      SELECT
        `research_paper_id`
      FROM
        `Research_Papers`
      WHERE
        `title` = 'Anglo-Saxon Class Dynamics and Migration'
    ),
    (
      SELECT
        `author_id`
      FROM
        `Authors`
      WHERE
        `first_name` = 'Nina'
        AND `last_name` = 'Faulkner'
    )
  );