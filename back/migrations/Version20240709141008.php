<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240709141008 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SEQUENCE article_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE category_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE chat_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE comment_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE event_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE ingredient_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE podcast_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE recipe_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE sub_category_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE article (id INT NOT NULL, writer_id INT DEFAULT NULL, title VARCHAR(255) NOT NULL, content TEXT NOT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_23A0E661BC7E6B6 ON article (writer_id)');
        $this->addSql('COMMENT ON COLUMN article.created_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('CREATE TABLE category (id INT NOT NULL, name VARCHAR(255) NOT NULL, description TEXT NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE category_event (category_id INT NOT NULL, event_id INT NOT NULL, PRIMARY KEY(category_id, event_id))');
        $this->addSql('CREATE INDEX IDX_D39D45EE12469DE2 ON category_event (category_id)');
        $this->addSql('CREATE INDEX IDX_D39D45EE71F7E88B ON category_event (event_id)');
        $this->addSql('CREATE TABLE chat (id INT NOT NULL, content VARCHAR(255) NOT NULL, sennd_data VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE comment (id INT NOT NULL, writer_id INT DEFAULT NULL, article_id INT DEFAULT NULL, title VARCHAR(255) NOT NULL, content TEXT NOT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_9474526C1BC7E6B6 ON comment (writer_id)');
        $this->addSql('CREATE INDEX IDX_9474526C7294869C ON comment (article_id)');
        $this->addSql('COMMENT ON COLUMN comment.created_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('CREATE TABLE event (id INT NOT NULL, creator_id INT DEFAULT NULL, name VARCHAR(255) NOT NULL, description TEXT NOT NULL, date DATE NOT NULL, time TIME(0) WITHOUT TIME ZONE NOT NULL, place VARCHAR(255) NOT NULL, picture VARCHAR(255) DEFAULT NULL, link VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_3BAE0AA761220EA6 ON event (creator_id)');
        $this->addSql('CREATE TABLE ingredient (id INT NOT NULL, name VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE podcast (id INT NOT NULL, title VARCHAR(255) NOT NULL, description TEXT NOT NULL, audio_file BYTEA NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE recipe (id INT NOT NULL, title VARCHAR(255) NOT NULL, description TEXT NOT NULL, pictures VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE recipe_ingredient (recipe_id INT NOT NULL, ingredient_id INT NOT NULL, PRIMARY KEY(recipe_id, ingredient_id))');
        $this->addSql('CREATE INDEX IDX_22D1FE1359D8A214 ON recipe_ingredient (recipe_id)');
        $this->addSql('CREATE INDEX IDX_22D1FE13933FE08C ON recipe_ingredient (ingredient_id)');
        $this->addSql('CREATE TABLE sub_category (id INT NOT NULL, category_id INT DEFAULT NULL, name VARCHAR(255) NOT NULL, description TEXT NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_BCE3F79812469DE2 ON sub_category (category_id)');
        $this->addSql('CREATE TABLE user_chat (user_id INT NOT NULL, chat_id INT NOT NULL, PRIMARY KEY(user_id, chat_id))');
        $this->addSql('CREATE INDEX IDX_1F1CBE63A76ED395 ON user_chat (user_id)');
        $this->addSql('CREATE INDEX IDX_1F1CBE631A9A7125 ON user_chat (chat_id)');
        $this->addSql('ALTER TABLE article ADD CONSTRAINT FK_23A0E661BC7E6B6 FOREIGN KEY (writer_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE category_event ADD CONSTRAINT FK_D39D45EE12469DE2 FOREIGN KEY (category_id) REFERENCES category (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE category_event ADD CONSTRAINT FK_D39D45EE71F7E88B FOREIGN KEY (event_id) REFERENCES event (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE comment ADD CONSTRAINT FK_9474526C1BC7E6B6 FOREIGN KEY (writer_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE comment ADD CONSTRAINT FK_9474526C7294869C FOREIGN KEY (article_id) REFERENCES article (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE event ADD CONSTRAINT FK_3BAE0AA761220EA6 FOREIGN KEY (creator_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE recipe_ingredient ADD CONSTRAINT FK_22D1FE1359D8A214 FOREIGN KEY (recipe_id) REFERENCES recipe (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE recipe_ingredient ADD CONSTRAINT FK_22D1FE13933FE08C FOREIGN KEY (ingredient_id) REFERENCES ingredient (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE sub_category ADD CONSTRAINT FK_BCE3F79812469DE2 FOREIGN KEY (category_id) REFERENCES category (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE user_chat ADD CONSTRAINT FK_1F1CBE63A76ED395 FOREIGN KEY (user_id) REFERENCES "user" (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE user_chat ADD CONSTRAINT FK_1F1CBE631A9A7125 FOREIGN KEY (chat_id) REFERENCES chat (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE user_group DROP CONSTRAINT fk_8f02bf9da76ed395');
        $this->addSql('ALTER TABLE user_group DROP CONSTRAINT fk_8f02bf9dfe54d947');
        $this->addSql('DROP TABLE user_group');
        $this->addSql('ALTER TABLE "group" DROP CONSTRAINT fk_6dc044c5f05788e9');
        $this->addSql('DROP INDEX idx_6dc044c5f05788e9');
        $this->addSql('ALTER TABLE "group" ADD creator_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE "group" DROP creator_id_id');
        $this->addSql('ALTER TABLE "group" ALTER description TYPE VARCHAR(255)');
        $this->addSql('ALTER TABLE "group" ADD CONSTRAINT FK_6DC044C561220EA6 FOREIGN KEY (creator_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX IDX_6DC044C561220EA6 ON "group" (creator_id)');
        $this->addSql('ALTER TABLE "user" DROP country');
        $this->addSql('ALTER TABLE "user" ALTER hobbies TYPE JSON');
        $this->addSql('ALTER TABLE "user" ALTER languages TYPE JSON');
        $this->addSql('ALTER TABLE "user" ALTER city DROP NOT NULL');
        $this->addSql('ALTER TABLE "user" ALTER updated_at DROP NOT NULL');
        $this->addSql('COMMENT ON COLUMN "user".hobbies IS NULL');
        $this->addSql('COMMENT ON COLUMN "user".languages IS NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('DROP SEQUENCE article_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE category_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE chat_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE comment_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE event_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE ingredient_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE podcast_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE recipe_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE sub_category_id_seq CASCADE');
        $this->addSql('CREATE TABLE user_group (user_id INT NOT NULL, group_id INT NOT NULL, PRIMARY KEY(user_id, group_id))');
        $this->addSql('CREATE INDEX idx_8f02bf9dfe54d947 ON user_group (group_id)');
        $this->addSql('CREATE INDEX idx_8f02bf9da76ed395 ON user_group (user_id)');
        $this->addSql('ALTER TABLE user_group ADD CONSTRAINT fk_8f02bf9da76ed395 FOREIGN KEY (user_id) REFERENCES "user" (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE user_group ADD CONSTRAINT fk_8f02bf9dfe54d947 FOREIGN KEY (group_id) REFERENCES "group" (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE article DROP CONSTRAINT FK_23A0E661BC7E6B6');
        $this->addSql('ALTER TABLE category_event DROP CONSTRAINT FK_D39D45EE12469DE2');
        $this->addSql('ALTER TABLE category_event DROP CONSTRAINT FK_D39D45EE71F7E88B');
        $this->addSql('ALTER TABLE comment DROP CONSTRAINT FK_9474526C1BC7E6B6');
        $this->addSql('ALTER TABLE comment DROP CONSTRAINT FK_9474526C7294869C');
        $this->addSql('ALTER TABLE event DROP CONSTRAINT FK_3BAE0AA761220EA6');
        $this->addSql('ALTER TABLE recipe_ingredient DROP CONSTRAINT FK_22D1FE1359D8A214');
        $this->addSql('ALTER TABLE recipe_ingredient DROP CONSTRAINT FK_22D1FE13933FE08C');
        $this->addSql('ALTER TABLE sub_category DROP CONSTRAINT FK_BCE3F79812469DE2');
        $this->addSql('ALTER TABLE user_chat DROP CONSTRAINT FK_1F1CBE63A76ED395');
        $this->addSql('ALTER TABLE user_chat DROP CONSTRAINT FK_1F1CBE631A9A7125');
        $this->addSql('DROP TABLE article');
        $this->addSql('DROP TABLE category');
        $this->addSql('DROP TABLE category_event');
        $this->addSql('DROP TABLE chat');
        $this->addSql('DROP TABLE comment');
        $this->addSql('DROP TABLE event');
        $this->addSql('DROP TABLE ingredient');
        $this->addSql('DROP TABLE podcast');
        $this->addSql('DROP TABLE recipe');
        $this->addSql('DROP TABLE recipe_ingredient');
        $this->addSql('DROP TABLE sub_category');
        $this->addSql('DROP TABLE user_chat');
        $this->addSql('ALTER TABLE "group" DROP CONSTRAINT FK_6DC044C561220EA6');
        $this->addSql('DROP INDEX IDX_6DC044C561220EA6');
        $this->addSql('ALTER TABLE "group" ADD creator_id_id INT NOT NULL');
        $this->addSql('ALTER TABLE "group" DROP creator_id');
        $this->addSql('ALTER TABLE "group" ALTER description TYPE TEXT');
        $this->addSql('ALTER TABLE "group" ADD CONSTRAINT fk_6dc044c5f05788e9 FOREIGN KEY (creator_id_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX idx_6dc044c5f05788e9 ON "group" (creator_id_id)');
        $this->addSql('ALTER TABLE "user" ADD country VARCHAR(255) NOT NULL');
        $this->addSql('ALTER TABLE "user" ALTER city SET NOT NULL');
        $this->addSql('ALTER TABLE "user" ALTER updated_at SET NOT NULL');
        $this->addSql('ALTER TABLE "user" ALTER hobbies TYPE TEXT');
        $this->addSql('ALTER TABLE "user" ALTER languages TYPE TEXT');
        $this->addSql('COMMENT ON COLUMN "user".hobbies IS \'(DC2Type:array)\'');
        $this->addSql('COMMENT ON COLUMN "user".languages IS \'(DC2Type:array)\'');
    }
}
