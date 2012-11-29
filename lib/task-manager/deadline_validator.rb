# ActiveModel 必须包含type或class_name_type（plan_type）属性
class DeadlineValidator < ActiveModel::EachValidator
  def validate_each(record, attribute, value)
    type = get_type(record)
    return unless type

    names = []
    case type.to_sym
    when :daily
      names = [:hour, :minute]
    when :weekly, :monthly
      names = [:hour, :minute, :day]
    when :quarterly, :yearly
      names = [:hour, :minute, :day, :month]
    end

    validate_deadline_of(record, attribute, value, names)
  end

  private
  def get_type(record)
    return record.type if record.respond_to?(:type)

    record.send("#{record.class.name.demodulize.underscore}_type")
  end

  def validate_deadline_of(record, attribute, value, names)
    names = [names] unless names.is_a? Array

    names.each do |name|
      name = "deadline_#{name}".to_sym
      record.errors[attribute] << ("#{name} is required") if value[name].blank?
    end
  end

end
